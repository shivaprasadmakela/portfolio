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

@Component
public class OpenRouterClient implements AiClient {

    private static final Logger logger = LoggerFactory.getLogger(OpenRouterClient.class);

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("${openrouter.api.key:PLACEHOLDER}")
    private String apiKey;

    @Value("${openrouter.url:https://openrouter.ai/api/v1/chat/completions}")
    private String apiUrl;

    @Value("${openrouter.model:google/gemma-4-31b-it:free}")
    private String model;

    public OpenRouterClient() {
        org.springframework.http.client.SimpleClientHttpRequestFactory factory = new org.springframework.http.client.SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(5000); // 5 seconds
        factory.setReadTimeout(12000);   // 12 seconds
        this.restTemplate = new RestTemplate(factory);
        this.objectMapper = new ObjectMapper();
    }

    @Override
    public String call(String prompt) {
        if ("PLACEHOLDER".equals(apiKey)) {
            throw new RuntimeException("AI feature is currently disabled (missing OpenRouter API Key).");
        }

        HttpHeaders headers = createHeaders();

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
            String responseStr = restTemplate.postForObject(apiUrl, entity, String.class);
            return parseOpenResponse(responseStr);
        } catch (org.springframework.web.client.HttpStatusCodeException e) {
            logger.error("OpenRouter HTTP Error: {}, Body: {}", e.getStatusCode(), e.getResponseBodyAsString());
            if (e.getStatusCode().value() == 429) {
                throw new RateLimitException("OpenRouter rate limit exceeded");
            }
            throw new RuntimeException("OpenRouter service is temporarily unavailable. Error: " + e.getStatusCode());
        } catch (Exception e) {
            throw new RuntimeException("Oops! Something went wrong while talking to OpenRouter.", e);
        }
    }

    @Override
    public String call(String systemInstruction, List<ChatMessage> history, String currentInput) {
        if ("PLACEHOLDER".equals(apiKey)) {
            throw new RuntimeException("AI feature is currently disabled (missing OpenRouter API Key).");
        }

        HttpHeaders headers = createHeaders();

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
            String responseStr = restTemplate.postForObject(apiUrl, entity, String.class);
            return parseOpenResponse(responseStr);
        } catch (org.springframework.web.client.HttpStatusCodeException e) {
            logger.error("OpenRouter HTTP Error: {}, Body: {}", e.getStatusCode(), e.getResponseBodyAsString());
            if (e.getStatusCode().value() == 429) {
                throw new RateLimitException("OpenRouter rate limit exceeded");
            }
            throw new RuntimeException("OpenRouter service is temporarily unavailable. Error: " + e.getStatusCode());
        } catch (Exception e) {
            throw new RuntimeException("Oops! Something went wrong while talking to OpenRouter.", e);
        }
    }

    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);
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
