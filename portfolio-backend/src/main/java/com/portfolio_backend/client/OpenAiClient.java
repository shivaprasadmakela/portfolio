package com.portfolio_backend.client;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Component
public class OpenAiClient {

    private final RestTemplate restTemplate;
    
    @Value("${openai.api.key:PLACEHOLDER}")
    private String apiKey;

    private static final String OPENAI_URL = "https://api.openai.com/v1/chat/completions";

    public OpenAiClient() {
        this.restTemplate = new RestTemplate();
    }

    public String call(String prompt) {
        if ("PLACEHOLDER".equals(apiKey)) {
            return "AI feature is currently disabled (missing API Key).";
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        Map<String, Object> body = new HashMap<>();
        body.put("model", "gpt-4o-mini");
        body.put("messages", Collections.singletonList(
            Map.of("role", "user", "content", prompt)
        ));
        body.put("temperature", 0.7);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            JsonNode response = restTemplate.postForObject(OPENAI_URL, entity, JsonNode.class);
            if (response != null && response.has("choices") && response.get("choices").size() > 0) {
                return response.get("choices").get(0).get("message").get("content").asText();
            }
        } catch (Exception e) {
            return "Error calling AI helper: " + e.getMessage();
        }

        return "No response from AI helper.";
    }
}
