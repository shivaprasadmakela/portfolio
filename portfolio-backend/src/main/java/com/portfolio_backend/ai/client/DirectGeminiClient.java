package com.portfolio_backend.ai.client;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfolio_backend.ai.dto.ChatRequest.ChatMessage;
import com.portfolio_backend.ai.exception.RateLimitException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class DirectGeminiClient implements AiClient {

    private static final Logger logger = LoggerFactory.getLogger(DirectGeminiClient.class);

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final List<ApiToken> tokenPool = new CopyOnWriteArrayList<>();

    @Value("${gemini.url.template:https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=%s}")
    private String urlTemplate;

    public DirectGeminiClient(
            @Value("${gemini.api.keys:PLACEHOLDER}") String keysConfig,
            @Value("${gemini.api.key:PLACEHOLDER}") String singleKey
    ) {
        // Parse comma-separated keys if present
        if (keysConfig != null && !keysConfig.isEmpty() && !"PLACEHOLDER".equals(keysConfig)) {
            for (String key : keysConfig.split(",")) {
                String trimmed = key.trim();
                if (!trimmed.isEmpty()) {
                    tokenPool.add(new ApiToken(trimmed));
                }
            }
        }

        // Fallback to singleKey if no keys were loaded in pool
        if (tokenPool.isEmpty() && singleKey != null && !singleKey.isEmpty() && !"PLACEHOLDER".equals(singleKey)) {
            tokenPool.add(new ApiToken(singleKey.trim()));
        }

        org.springframework.http.client.SimpleClientHttpRequestFactory factory = new org.springframework.http.client.SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(3000); // 3 seconds
        factory.setReadTimeout(6000);    // 6 seconds
        this.restTemplate = new RestTemplate(factory);
        this.objectMapper = new ObjectMapper();
    }

    private ApiToken getAvailableToken() {
        return tokenPool.stream()
                .filter(ApiToken::isAvailable)
                .findFirst()
                .orElse(null);
    }

    private String maskKey(String key) {
        if (key == null || key.length() < 8) return "***";
        return key.substring(0, 4) + "..." + key.substring(key.length() - 4);
    }

    @Override
    public String call(String prompt) {
        if (tokenPool.isEmpty()) {
            throw new RuntimeException("AI feature is currently disabled (missing Gemini API Key).");
        }

        long cooldownMs = 60000; // 1 minute block on 429 rate limit
        int maxAttempts = tokenPool.size();

        for (int attempt = 0; attempt < maxAttempts; attempt++) {
            ApiToken token = getAvailableToken();
            if (token == null) {
                logger.error("No active Gemini tokens available. All are on cooldown.");
                throw new RateLimitException("All Gemini API keys in the pool are rate-limited.");
            }

            String url = String.format(urlTemplate, token.getKey());

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Gemini Request Structure
            Map<String, Object> part = new HashMap<>();
            part.put("text", prompt);

            Map<String, Object> content = new HashMap<>();
            content.put("parts", Collections.singletonList(part));

            Map<String, Object> body = new HashMap<>();
            body.put("contents", Collections.singletonList(content));

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            try {
                logger.info("Executing Gemini call using token: {}", maskKey(token.getKey()));
                String responseStr = restTemplate.postForObject(url, entity, String.class);
                JsonNode response = objectMapper.readTree(responseStr);
                
                if (response != null && response.has("candidates") && response.get("candidates").size() > 0) {
                    JsonNode candidate = response.get("candidates").get(0);
                    if (candidate.has("content") && candidate.get("content").has("parts") && candidate.get("content").get("parts").size() > 0) {
                        return candidate.get("content").get("parts").get(0).get("text").asText();
                    }
                }
                return "No response from Gemini AI.";
            } catch (org.springframework.web.client.HttpStatusCodeException e) {
                if (e.getStatusCode().value() == 429) {
                    logger.warn("Gemini API key rate limited: {}. Blocking token for {}ms and retrying.", maskKey(token.getKey()), cooldownMs);
                    token.blockFor(cooldownMs);
                    // continue loop to try next token
                } else {
                    logger.error("Gemini HTTP Error: {}", e.getStatusCode());
                    throw new RuntimeException("AI service is temporarily unavailable. Error: " + e.getStatusCode());
                }
            } catch (Exception e) {
                logger.error("Unexpected error during Gemini call", e);
                throw new RuntimeException("Oops! Something went wrong while talking to the AI. Please try again later.", e);
            }
        }

        throw new RateLimitException("All available Gemini tokens are rate-limited.");
    }

    @Override
    public String call(String systemInstruction, List<ChatMessage> history, String currentInput) {
        if (tokenPool.isEmpty()) {
            throw new RuntimeException("AI feature is currently disabled (missing Gemini API Key).");
        }

        long cooldownMs = 60000; // 1 minute block on 429 rate limit
        int maxAttempts = tokenPool.size();

        for (int attempt = 0; attempt < maxAttempts; attempt++) {
            ApiToken token = getAvailableToken();
            if (token == null) {
                logger.error("No active Gemini tokens available. All are on cooldown.");
                throw new RateLimitException("All Gemini API keys in the pool are rate-limited.");
            }

            String url = String.format(urlTemplate, token.getKey());

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // 1. Build systemInstruction Map
            Map<String, Object> systemPart = new HashMap<>();
            systemPart.put("text", systemInstruction);

            Map<String, Object> systemInstructionMap = new HashMap<>();
            systemInstructionMap.put("parts", Collections.singletonList(systemPart));

            // 2. Build contents list (history + current message)
            List<Map<String, Object>> contentsList = new ArrayList<>();

            // Add history (limit to last 10 messages)
            if (history != null && !history.isEmpty()) {
                int start = Math.max(0, history.size() - 10);
                for (int i = start; i < history.size(); i++) {
                    ChatMessage msg = history.get(i);
                    
                    Map<String, Object> part = new HashMap<>();
                    part.put("text", msg.text());

                    Map<String, Object> contentMap = new HashMap<>();
                    contentMap.put("role", "ai".equalsIgnoreCase(msg.sender()) ? "model" : "user");
                    contentMap.put("parts", Collections.singletonList(part));

                    contentsList.add(contentMap);
                }
            }

            // Add current input
            Map<String, Object> currentPart = new HashMap<>();
            currentPart.put("text", currentInput);

            Map<String, Object> currentContentMap = new HashMap<>();
            currentContentMap.put("role", "user");
            currentContentMap.put("parts", Collections.singletonList(currentPart));

            contentsList.add(currentContentMap);

            // 3. Construct Request Body
            Map<String, Object> body = new HashMap<>();
            body.put("contents", contentsList);
            body.put("systemInstruction", systemInstructionMap);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            try {
                logger.info("Executing Gemini chat call using token: {}", maskKey(token.getKey()));
                String responseStr = restTemplate.postForObject(url, entity, String.class);
                JsonNode response = objectMapper.readTree(responseStr);
                
                if (response != null && response.has("candidates") && response.get("candidates").size() > 0) {
                    JsonNode candidate = response.get("candidates").get(0);
                    if (candidate.has("content") && candidate.get("content").has("parts") && candidate.get("content").get("parts").size() > 0) {
                        return candidate.get("content").get("parts").get(0).get("text").asText();
                    }
                }
                return "No response from Gemini AI.";
            } catch (org.springframework.web.client.HttpStatusCodeException e) {
                if (e.getStatusCode().value() == 429) {
                    logger.warn("Gemini API key rate limited: {}. Blocking token for {}ms and retrying.", maskKey(token.getKey()), cooldownMs);
                    token.blockFor(cooldownMs);
                    // continue loop to try next token
                } else {
                    logger.error("Gemini HTTP Error: {}", e.getStatusCode());
                    throw new RuntimeException("AI service is temporarily unavailable. Error: " + e.getStatusCode());
                }
            } catch (Exception e) {
                logger.error("Unexpected error during Gemini chat call", e);
                throw new RuntimeException("Oops! Something went wrong while talking to the AI. Please try again later.", e);
            }
        }

        throw new RateLimitException("All available Gemini tokens are rate-limited.");
    }
}
