package com.portfolio_backend.common.interceptor;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.time.Duration;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Per-client throttling for the two endpoint groups that cost something to serve:
 * check-in (writes) and the AI proxy (spends upstream API quota).
 *
 * Applied via path patterns in {@link com.portfolio_backend.common.config.WebConfig}
 * rather than by comparing the URI here, so adding a route cannot silently opt out
 * of throttling.
 */
@Component
public class RateLimitingInterceptor implements HandlerInterceptor {

    private static final Logger logger = LoggerFactory.getLogger(RateLimitingInterceptor.class);

    /** Ceiling on tracked clients, so the map cannot grow without bound. */
    private static final int MAX_TRACKED_CLIENTS = 10_000;

    private static final int CHECKIN_CAPACITY = 5;
    private static final Duration CHECKIN_WINDOW = Duration.ofMinutes(10);

    private static final int AI_CAPACITY = 20;
    private static final Duration AI_WINDOW = Duration.ofMinutes(10);

    // LRU-bounded: oldest client is evicted once the cap is reached. Bucket4j buckets
    // are cheap to rebuild, so eviction costs an evicted client a fresh allowance
    // rather than correctness.
    private final Map<String, Bucket> buckets = Collections.synchronizedMap(
            new LinkedHashMap<>(256, 0.75f, true) {
                @Override
                protected boolean removeEldestEntry(Map.Entry<String, Bucket> eldest) {
                    return size() > MAX_TRACKED_CLIENTS;
                }
            }
    );

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        // Preflight carries no cost and no client identity worth charging.
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        String uri = request.getRequestURI();
        boolean isAi = uri.startsWith("/api/ai/");
        if (!isAi && !("POST".equalsIgnoreCase(request.getMethod()) && uri.equals("/api/challenges/checkin"))) {
            return true;
        }

        String key = (isAi ? "ai:" : "checkin:") + clientIp(request);
        Bucket bucket = buckets.computeIfAbsent(key, k -> newBucket(isAi));

        if (bucket.tryConsume(1)) {
            return true;
        }

        logger.warn("Rate limit exceeded for {} on {}", key, uri);
        response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(
                "{\"code\":\"RATE_LIMIT_ERROR\",\"message\":\"Too many requests. Please try again later.\"}"
        );
        return false;
    }

    private Bucket newBucket(boolean isAi) {
        Bandwidth limit = Bandwidth.builder()
                .capacity(isAi ? AI_CAPACITY : CHECKIN_CAPACITY)
                .refillGreedy(isAi ? AI_CAPACITY : CHECKIN_CAPACITY, isAi ? AI_WINDOW : CHECKIN_WINDOW)
                .build();
        return Bucket.builder().addLimit(limit).build();
    }

    /**
     * Behind Cloud Run's front end, getRemoteAddr() is the proxy — so keying on it
     * put every visitor in one shared bucket. The real client is the first hop in
     * X-Forwarded-For.
     */
    private String clientIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            String first = forwarded.split(",")[0].trim();
            if (!first.isEmpty()) {
                return first;
            }
        }
        String remote = request.getRemoteAddr();
        return remote != null ? remote : "unknown";
    }
}
