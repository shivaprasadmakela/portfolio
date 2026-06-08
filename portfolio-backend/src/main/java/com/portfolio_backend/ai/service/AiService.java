package com.portfolio_backend.ai.service;

import com.portfolio_backend.ai.client.AiClient;
import com.portfolio_backend.ai.dto.ChatRequest.ChatMessage;
import com.portfolio_backend.ai.prompts.AiPromptTemplates;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AiService {

    private static final List<String> NOISE_RESPONSES = List.of(
        "Wait, is that secret Morse code? 📡 I'm smart, but I haven't cracked that cipher yet! Ask me about Shiva's coding journey or tech stack instead.",
        "Boop beep? 🤖 I only speak human! Try asking about Shiva's web apps, resume, or favorite stack instead of typing mysterious symbols.",
        "Dot dot dash? 🧐 If you're testing my patience, it's working! Just kidding—ask me about Shiva's engineering background or his latest projects.",
        "Ah, trying to communicate via telepathy? 🧠 Unfortunately, my server doesn't support brainwave protocols yet. Try asking a question about Shiva!"
    );

    private static final List<String> EMPTY_RESPONSES = List.of(
        "Hmm, my neural networks went on a sudden coffee break. ☕ Ask me something else about Shiva's web apps, Spring Boot APIs, or developer journey!",
        "Whoops! It looks like my thoughts got lost in the cloud. ☁️ Try asking again, or check out Shiva's projects directly!",
        "Even AIs get tongue-tied sometimes! 🤐 Let's try that again—ask me about Shiva's tech stack, experiences, or hobbies.",
        "Looks like my digital gears got temporarily jammed. ⚙️ Give it another spin or ask about Shiva's full-stack adventures!"
    );

    private final AiClient aiClient;
    private final AiPromptBuilder aiPromptBuilder;

    public AiService(AiClient aiClient, AiPromptBuilder aiPromptBuilder) {
        this.aiClient = aiClient;
        this.aiPromptBuilder = aiPromptBuilder;
    }
    public String chatAboutMe(String userMessage, List<ChatMessage> history) {
        validate(userMessage);
        
        String cleanMsg = userMessage.trim();
        // Check if the message is purely punctuation/non-alphanumeric noise
        if (cleanMsg.matches("^[^a-zA-Z0-9]*$")) {
            int idx = java.util.concurrent.ThreadLocalRandom.current().nextInt(NOISE_RESPONSES.size());
            return NOISE_RESPONSES.get(idx);
        }

        String systemInstruction = aiPromptBuilder.buildSystemInstruction(userMessage);
        String response = aiClient.call(systemInstruction, history, userMessage);
        
        if (response == null || response.trim().isEmpty()) {
            int idx = java.util.concurrent.ThreadLocalRandom.current().nextInt(EMPTY_RESPONSES.size());
            return EMPTY_RESPONSES.get(idx);
        }
        
        return response;
    }

    public String improveTitle(String title) {
        validate(title);
        String prompt = AiPromptTemplates.IMPROVE_TITLE_PROMPT.formatted(title);
        return cleanResponse(aiClient.call(prompt));
    }

    public String enhanceContent(String content) {
        validate(content);
        String prompt = AiPromptTemplates.ENHANCE_CONTENT_PROMPT.formatted(content);
        return cleanResponse(aiClient.call(prompt));
    }

    public String summarize(String content) {
        validate(content);
        String prompt = AiPromptTemplates.SUMMARIZE_PROMPT.formatted(content);
        return cleanResponse(aiClient.call(prompt));
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
