package com.portfolio_backend.service.ai;

import com.portfolio_backend.dto.ai.AiRequest;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class AiPromptBuilder {

    private final ProfileService profileService;

    public AiPromptBuilder(ProfileService profileService) {
        this.profileService = profileService;
    }

    public String buildChatPrompt(String userMessage, List<AiRequest.ChatMessage> history) {
        StringBuilder prompt = new StringBuilder();
        
        // 1. Always include basic rules and persona
        prompt.append("Rules: ").append(profileService.getSection("rules")).append("\n\n");
        prompt.append("Basic Info: ").append(profileService.getSection("basic")).append("\n\n");

        // 2. Include Recent History for flow
        if (history != null && !history.isEmpty()) {
            prompt.append("Recent Conversation History:\n");
            // Only take last 5 messages to save tokens
            int start = Math.max(0, history.size() - 5);
            for (int i = start; i < history.size(); i++) {
                AiRequest.ChatMessage msg = history.get(i);
                prompt.append(msg.getSender().toUpperCase()).append(": ").append(msg.getText()).append("\n");
            }
            prompt.append("\n");
        }

        // 2. Detect simple greetings for extreme conciseness
        String lowerMessage = userMessage.toLowerCase().trim();
        boolean isSimpleGreeting = isSimpleGreeting(lowerMessage);
        if (isSimpleGreeting) {
            prompt.append("Instruction: This is a simple greeting. Respond with exactly one short, friendly sentence. Do NOT start with 'Hi there!', do NOT offer help, and do NOT mention Shiva's location.\n\n");
        } else {
            prompt.append("Instruction: Be extremely direct. DO NOT start your response with 'Hi', 'Hello', 'Hi there!', or 'Shiva is based in...'. DO NOT introduce yourself. Start immediately with the answer to the user's question. Only mention Shiva's location if the user specifically asks where he is from.\n\n");
        }

        // 3. Dynamically select relevant context
        List<String> sections = new ArrayList<>();

        if (containsAny(lowerMessage, "work", "job", "experience", "role", "company", "modlix", "career")) {
            sections.add("experience");
        }
        
        if (containsAny(lowerMessage, "project", "build", "create", "app", "demo", "github", "stack", "tech")) {
            sections.add("projects");
        }

        if (containsAny(lowerMessage, "personality", "interest", "goal", "youtube", "traits") || lowerMessage.contains("who are you") || lowerMessage.contains("who is shiva")) {
            sections.add("personality");
        }

        if (sections.isEmpty() && !isSimpleGreeting) {
            prompt.append("Instruction: The user's question is unrelated to Shiva. DO NOT introduce yourself, DO NOT apologize, and DO NOT offer help. Use exactly ONE of the 'funny_fallbacks' from the rules to jokingly redirect them, and then STOP. Do not write more than one sentence.\n\n");
        } else {
            for (String section : sections) {
                prompt.append(capitalize(section)).append(" Context: ")
                      .append(profileService.getSection(section)).append("\n\n");
            }
        }

        prompt.append("User Question: ").append(userMessage);

        return prompt.toString();
    }

    private boolean isSimpleGreeting(String message) {
        Set<String> greetings = Set.of("hi", "hello", "hey", "how are you", "how are u", "gm", "gn", "good morning", "good evening");
        return greetings.contains(message) || (message.length() < 10 && containsAny(message, "hi", "hello", "hey"));
    }

    private boolean containsAny(String message, String... keywords) {
        return Stream.of(keywords).anyMatch(message::contains);
    }

    private String capitalize(String str) {
        if (str == null || str.isEmpty()) return str;
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }
}
