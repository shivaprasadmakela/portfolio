package com.portfolio_backend.client;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfolio_backend.dto.ai.AiRequest.ChatMessage;
import com.portfolio_backend.exception.ai.RateLimitException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class OpenRouterClient implements AiClient {

    private static final Logger logger = LoggerFactory.getLogger(OpenRouterClient.class);

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final List<ApiToken> tokenPool = new CopyOnWriteArrayList<>();

    @Value("${openrouter.url:https://openrouter.ai/api/v1/chat/completions}")
    private String apiUrl;

    @Value("${openrouter.model:google/gemma-4-31b-it:free}")
    private String model;

    public OpenRouterClient(
            @Value("${openrouter.api.keys:PLACEHOLDER}") String keysConfig,
            @Value("${openrouter.api.key:PLACEHOLDER}") String singleKey
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
        factory.setConnectTimeout(5000); // 5 seconds
        factory.setReadTimeout(12000);   // 12 seconds
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
            throw new RuntimeException("AI feature is currently disabled (missing OpenRouter API Key).");
        }

        long cooldownMs = 60000; // 1 minute block on 429 rate limit
        int maxAttempts = tokenPool.size();

        for (int attempt = 0; attempt < maxAttempts; attempt++) {
            ApiToken token = getAvailableToken();
            if (token == null) {
                logger.error("No active OpenRouter tokens available. All are on cooldown.");
                throw new RateLimitException("All OpenRouter API keys in the pool are rate-limited.");
            }

            HttpHeaders headers = createHeaders(token.getKey());

            // Build simple OpenAI message structure
            List<Map<String, String>> messages = new ArrayList<>();
            
            Map<String, String> userMessage = new HashMap<>();
            userMessage.put("role", "user");
            userMessage.put("content", prompt);
            messages.add(userMessage);

            Map<String, Object> body = new HashMap<>();
            body.put("model", model);
            body.put("messages", messages);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            try {
                logger.info("Executing OpenRouter call using token: {}", maskKey(token.getKey()));
                String responseStr = restTemplate.postForObject(apiUrl, entity, String.class);
                return parseOpenResponse(responseStr);
            } catch (org.springframework.web.client.HttpStatusCodeException e) {
                logger.error("OpenRouter HTTP Error: {}, Body: {}", e.getStatusCode(), e.getResponseBodyAsString());
                if (e.getStatusCode().value() == 429) {
                    logger.warn("OpenRouter API key rate limited: {}. Blocking token for {}ms and retrying.", maskKey(token.getKey()), cooldownMs);
                    token.blockFor(cooldownMs);
                    // continue loop to try next token
                } else {
                    throw new RuntimeException("OpenRouter service is temporarily unavailable. Error: " + e.getStatusCode());
                }
            } catch (Exception e) {
                logger.error("Unexpected error during OpenRouter call", e);
                throw new RuntimeException("Oops! Something went wrong while talking to OpenRouter.", e);
            }
        }

        throw new RateLimitException("All available OpenRouter tokens are rate-limited.");
    }

    @Override
    public String call(String systemInstruction, List<ChatMessage> history, String currentInput) {
        if (tokenPool.isEmpty()) {
            throw new RuntimeException("AI feature is currently disabled (missing OpenRouter API Key).");
        }

        long cooldownMs = 60000; // 1 minute block on 429 rate limit
        int maxAttempts = tokenPool.size();

        for (int attempt = 0; attempt < maxAttempts; attempt++) {
            ApiToken token = getAvailableToken();
            if (token == null) {
                logger.error("No active OpenRouter tokens available. All are on cooldown.");
                throw new RateLimitException("All OpenRouter API keys in the pool are rate-limited.");
            }

            HttpHeaders headers = createHeaders(token.getKey());

            List<Map<String, String>> messages = new ArrayList<>();

            // 1. Add System Instruction
            if (systemInstruction != null && !systemInstruction.trim().isEmpty()) {
                Map<String, String> sysMsg = new HashMap<>();
                sysMsg.put("role", "system");
                sysMsg.put("content", systemInstruction);
                messages.add(sysMsg);
            }

            // 2. Add History
            if (history != null && !history.isEmpty()) {
                int start = Math.max(0, history.size() - 10);
                for (int i = start; i < history.size(); i++) {
                    ChatMessage msg = history.get(i);
                    Map<String, String> histMsg = new HashMap<>();
                    histMsg.put("role", "ai".equalsIgnoreCase(msg.getSender()) ? "assistant" : "user");
                    histMsg.put("content", msg.getText());
                    messages.add(histMsg);
                }
            }

            // 3. Add Current Input
            Map<String, String> currentMsg = new HashMap<>();
            currentMsg.put("role", "user");
            currentMsg.put("content", currentInput);
            messages.add(currentMsg);

            Map<String, Object> body = new HashMap<>();
            body.put("model", model);
            body.put("messages", messages);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            try {
                logger.info("Executing OpenRouter chat call using token: {}", maskKey(token.getKey()));
                String responseStr = restTemplate.postForObject(apiUrl, entity, String.class);
                return parseOpenResponse(responseStr);
            } catch (org.springframework.web.client.HttpStatusCodeException e) {
                logger.error("OpenRouter HTTP Error: {}, Body: {}", e.getStatusCode(), e.getResponseBodyAsString());
                if (e.getStatusCode().value() == 429) {
                    logger.warn("OpenRouter API key rate limited: {}. Blocking token for {}ms and retrying.", maskKey(token.getKey()), cooldownMs);
                    token.blockFor(cooldownMs);
                    // continue loop to try next token
                } else {
                    throw new RuntimeException("OpenRouter service is temporarily unavailable. Error: " + e.getStatusCode());
                }
            } catch (Exception e) {
                logger.error("Unexpected error during OpenRouter chat call", e);
                throw new RuntimeException("Oops! Something went wrong while talking to OpenRouter.", e);
            }
        }

        throw new RateLimitException("All available OpenRouter tokens are rate-limited.");
    }

    private HttpHeaders createHeaders(String key) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + key);
        headers.set("HTTP-Referer", "http://localhost:8080");
        headers.set("X-Title", "Shiva Portfolio");
        return headers;
    }

    private String parseOpenResponse(String responseStr) throws Exception {
        JsonNode response = objectMapper.readTree(responseStr);
        if (response != null && response.has("choices") && response.get("choices").size() > 0) {
            JsonNode choice = response.get("choices").get(0);
            if (choice.has("message") && choice.get("message").has("content")) {
                return choice.get("message").get("content").asText();
            }
        }
        return "No response from OpenRouter AI.";
    }
}
