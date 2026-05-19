package com.portfolio_backend.client;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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
public class GeminiClient {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    
    @Value("${gemini.api.key:PLACEHOLDER}")
    private String apiKey;

    @Value("${gemini.url.template:https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=%s}")
    private String urlTemplate;

    public GeminiClient() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    public String call(String prompt) {
        if ("PLACEHOLDER".equals(apiKey)) {
            return "AI feature is currently disabled (missing Gemini API Key).";
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
            // Use String.class to avoid TypeDefinition errors with JsonNode
            String responseStr = restTemplate.postForObject(url, entity, String.class);
            JsonNode response = objectMapper.readTree(responseStr);
            
            // Gemini Response Structure: candidates[0].content.parts[0].text
            if (response != null && response.has("candidates") && response.get("candidates").size() > 0) {
                JsonNode candidate = response.get("candidates").get(0);
                if (candidate.has("content") && candidate.get("content").has("parts") && candidate.get("content").get("parts").size() > 0) {
                    return candidate.get("content").get("parts").get(0).get("text").asText();
                }
            }
        } catch (org.springframework.web.client.HttpStatusCodeException e) {
            if (e.getStatusCode().value() == 429) {
                return "The AI assistant is currently taking a short break (daily limit reached). Please try again later or contact Shiva directly!";
            }
            return "AI service is temporarily unavailable. Error: " + e.getStatusCode();
        } catch (Exception e) {
            return "Oops! Something went wrong while talking to the AI. Please try again later.";
        }

        return "No response from Gemini AI.";
    }

    public void streamCall(String prompt, org.springframework.web.servlet.mvc.method.annotation.SseEmitter emitter) {
        if ("PLACEHOLDER".equals(apiKey)) {
            try {
                emitter.send("AI feature is currently disabled (missing Gemini API Key).");
                emitter.complete();
            } catch (Exception ignored) {}
            return;
        }

        // Convert the standard URL to the streaming URL
        String urlString = String.format(urlTemplate, apiKey).replace("generateContent?", "streamGenerateContent?alt=sse&");

        try {
            Map<String, Object> part = new HashMap<>();
            part.put("text", prompt);
            Map<String, Object> content = new HashMap<>();
            content.put("parts", Collections.singletonList(part));
            Map<String, Object> body = new HashMap<>();
            body.put("contents", Collections.singletonList(content));

            String jsonBody = objectMapper.writeValueAsString(body);

            java.net.URL url = new java.net.URL(urlString);
            java.net.HttpURLConnection conn = (java.net.HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setDoOutput(true);
            
            try(java.io.OutputStream os = conn.getOutputStream()) {
                byte[] inputBytes = jsonBody.getBytes("utf-8");
                os.write(inputBytes, 0, inputBytes.length);           
            }

            int status = conn.getResponseCode();
            if (status == 429) {
                try {
                    emitter.send("The AI assistant is currently taking a short break (daily limit reached). Please try again later or contact Shiva directly!");
                    emitter.complete();
                } catch (Exception ignored) {}
                return;
            } else if (status != 200) {
                try {
                    System.out.println("Gemini API Error: " + status);
                    try(java.io.BufferedReader br = new java.io.BufferedReader(new java.io.InputStreamReader(conn.getErrorStream(), "utf-8"))) {
                        String line;
                        while ((line = br.readLine()) != null) {
                            System.out.println(line);
                        }
                    }
                    emitter.send("Error from AI provider. Status: " + status);
                    emitter.complete();
                } catch (Exception ignored) {}
                return;
            }

            try(java.io.BufferedReader br = new java.io.BufferedReader(new java.io.InputStreamReader(conn.getInputStream(), "utf-8"))) {
                String line;
                while ((line = br.readLine()) != null) {
                    if (line.startsWith("data: ")) {
                        try {
                            String data = line.substring(6);
                            JsonNode node = objectMapper.readTree(data);
                            if (node != null && node.has("candidates") && node.get("candidates").size() > 0) {
                                JsonNode candidate = node.get("candidates").get(0);
                                if (candidate.has("content") && candidate.get("content").has("parts") && candidate.get("content").get("parts").size() > 0) {
                                    String text = candidate.get("content").get("parts").get(0).get("text").asText();
                                    // Send raw text chunk, frontend will append
                                    emitter.send(text);
                                }
                            }
                        } catch (Exception ignored) {}
                    }
                }
            }
            emitter.complete();

        } catch (Exception e) {
            try {
                emitter.send("Oops! Something went wrong while talking to the AI. Please try again later.");
                emitter.completeWithError(e);
            } catch (Exception ignored) {}
        }
    }
}

