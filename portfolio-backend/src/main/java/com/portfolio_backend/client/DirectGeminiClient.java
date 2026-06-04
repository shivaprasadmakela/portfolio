package com.portfolio_backend.client;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfolio_backend.dto.ai.AiRequest.ChatMessage;
import com.portfolio_backend.exception.ai.RateLimitException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class DirectGeminiClient implements AiClient {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    
    @Value("${gemini.api.key:PLACEHOLDER}")
    private String apiKey;

    @Value("${gemini.url.template:https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=%s}")
    private String urlTemplate;

    public DirectGeminiClient() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    @Override
    public String call(String prompt) {
        if ("PLACEHOLDER".equals(apiKey)) {
            throw new RuntimeException("AI feature is currently disabled (missing Gemini API Key).");
        }

        String url = String.format(urlTemplate, apiKey);

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
            String responseStr = restTemplate.postForObject(url, entity, String.class);
            JsonNode response = objectMapper.readTree(responseStr);
            
            if (response != null && response.has("candidates") && response.get("candidates").size() > 0) {
                JsonNode candidate = response.get("candidates").get(0);
                if (candidate.has("content") && candidate.get("content").has("parts") && candidate.get("content").get("parts").size() > 0) {
                    return candidate.get("content").get("parts").get(0).get("text").asText();
                }
            }
        } catch (org.springframework.web.client.HttpStatusCodeException e) {
            if (e.getStatusCode().value() == 429) {
                throw new RateLimitException("Gemini rate limit exceeded");
            }
            throw new RuntimeException("AI service is temporarily unavailable. Error: " + e.getStatusCode());
        } catch (Exception e) {
            throw new RuntimeException("Oops! Something went wrong while talking to the AI. Please try again later.", e);
        }

        return "No response from Gemini AI.";
    }

    @Override
    public String call(String systemInstruction, List<ChatMessage> history, String currentInput) {
        if ("PLACEHOLDER".equals(apiKey)) {
            throw new RuntimeException("AI feature is currently disabled (missing Gemini API Key).");
        }

        String url = String.format(urlTemplate, apiKey);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // 1. Build systemInstruction Map
        Map<String, Object> systemPart = new HashMap<>();
        systemPart.put("text", systemInstruction);

        Map<String, Object> systemInstructionMap = new HashMap<>();
        systemInstructionMap.put("parts", Collections.singletonList(systemPart));

        // 2. Build contents list (history + current message)
        List<Map<String, Object>> contentsList = new java.util.ArrayList<>();

        // Add history (limit to last 10 messages)
        if (history != null && !history.isEmpty()) {
            int start = Math.max(0, history.size() - 10);
            for (int i = start; i < history.size(); i++) {
                ChatMessage msg = history.get(i);
                
                Map<String, Object> part = new HashMap<>();
                part.put("text", msg.getText());

                Map<String, Object> contentMap = new HashMap<>();
                contentMap.put("role", "ai".equalsIgnoreCase(msg.getSender()) ? "model" : "user");
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
            String responseStr = restTemplate.postForObject(url, entity, String.class);
            JsonNode response = objectMapper.readTree(responseStr);
            
            if (response != null && response.has("candidates") && response.get("candidates").size() > 0) {
                JsonNode candidate = response.get("candidates").get(0);
                if (candidate.has("content") && candidate.get("content").has("parts") && candidate.get("content").get("parts").size() > 0) {
                    return candidate.get("content").get("parts").get(0).get("text").asText();
                }
            }
        } catch (org.springframework.web.client.HttpStatusCodeException e) {
            if (e.getStatusCode().value() == 429) {
                throw new RateLimitException("Gemini rate limit exceeded");
            }
            throw new RuntimeException("AI service is temporarily unavailable. Error: " + e.getStatusCode());
        } catch (Exception e) {
            throw new RuntimeException("Oops! Something went wrong while talking to the AI. Please try again later.", e);
        }

        return "No response from Gemini AI.";
    }
}
