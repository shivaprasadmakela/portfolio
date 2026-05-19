package com.portfolio_backend.service.ai;

import com.portfolio_backend.client.GeminiClient;
import com.portfolio_backend.dto.ai.AiRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AiService {

    private final GeminiClient geminiClient;
    private final AiPromptBuilder aiPromptBuilder;

    public AiService(GeminiClient geminiClient, AiPromptBuilder aiPromptBuilder) {
        this.geminiClient = geminiClient;
        this.aiPromptBuilder = aiPromptBuilder;
    }

    public String chatAboutMe(String userMessage, List<AiRequest.ChatMessage> history) {
        validate(userMessage);
        String systemPrompt = aiPromptBuilder.buildChatPrompt(userMessage, history);
        return geminiClient.call(systemPrompt);
    }

    public String improveTitle(String title) {
        validate(title);
        String prompt = AiPromptTemplates.IMPROVE_TITLE_PROMPT.formatted(title);
        return cleanResponse(geminiClient.call(prompt));
    }

    public String enhanceContent(String content) {
        validate(content);
        String prompt = AiPromptTemplates.ENHANCE_CONTENT_PROMPT.formatted(content);
        return cleanResponse(geminiClient.call(prompt));
    }

    public String summarize(String content) {
        validate(content);
        String prompt = AiPromptTemplates.SUMMARIZE_PROMPT.formatted(content);
        return cleanResponse(geminiClient.call(prompt));
    }

    private String cleanResponse(String response) {
        if (response == null)
            return "{}";
        // Remove markdown code blocks if present
        String cleaned = response.trim();
        if (cleaned.startsWith("```json")) {
            cleaned = cleaned.substring(7);
        } else if (cleaned.startsWith("```")) {
            cleaned = cleaned.substring(3);
        }
        if (cleaned.endsWith("```")) {
            cleaned = cleaned.substring(0, cleaned.length() - 3);
        }
        return cleaned.trim();
    }

    private void validate(String input) {
        if (input == null || input.trim().isEmpty()) {
            throw new IllegalArgumentException("Input content cannot be empty.");
        }
    }
}
