package com.portfolio_backend.ai.service;

import com.portfolio_backend.ai.client.AiClient;
import com.portfolio_backend.ai.dto.ChatRequest.ChatMessage;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

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
        if (userMessage == null || userMessage.trim().isEmpty()) {
            throw new IllegalArgumentException("Input content cannot be empty.");
        }

        String cleanMsg = userMessage.trim();
        // Check if the message is purely punctuation/non-alphanumeric noise
        if (cleanMsg.matches("^[^a-zA-Z0-9]*$")) {
            return pick(NOISE_RESPONSES);
        }

        String systemInstruction = aiPromptBuilder.buildSystemInstruction(userMessage);
        String response = aiClient.call(systemInstruction, history, userMessage);

        if (response == null || response.trim().isEmpty()) {
            return pick(EMPTY_RESPONSES);
        }

        return response;
    }

    private String pick(List<String> options) {
        return options.get(ThreadLocalRandom.current().nextInt(options.size()));
    }
}
