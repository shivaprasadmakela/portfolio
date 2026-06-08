package com.portfolio_backend.ai.service;

import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Stream;

@Component
public class AiPromptBuilder {

    private final ProfileService profileService;

    public AiPromptBuilder(ProfileService profileService) {
        this.profileService = profileService;
    }

    public String buildSystemInstruction(String userMessage) {
        StringBuilder instruction = new StringBuilder();
        instruction.append("You are Shiva's AI Assistant. Your goal is to answer professional questions about Shiva's career, projects, and skills. Use the following context, rules, and fallbacks to answer the user's question.\n\n");

        instruction.append("Persona and Rules:\n").append(profileService.getSection("rules")).append("\n\n");
        instruction.append("Basic Info:\n").append(profileService.getSection("basic")).append("\n\n");
        instruction.append("Experience:\n").append(profileService.getSection("experience")).append("\n\n");
        instruction.append("Projects:\n").append(profileService.getSection("projects")).append("\n\n");
        instruction.append("Personality:\n").append(profileService.getSection("personality")).append("\n\n");

        String lowerMessage = userMessage != null ? userMessage.toLowerCase().trim() : "";
        boolean isSimpleGreeting = isSimpleGreeting(lowerMessage);
        boolean isAcknowledgment = isAcknowledgment(lowerMessage);

        if (isSimpleGreeting) {
            instruction.append("Contextual Instruction: This is a simple greeting. Respond with exactly one short, friendly sentence. Do NOT start with 'Hi there!', do NOT offer help, and do NOT mention Shiva's location.\n\n");
        } else if (isAcknowledgment) {
            instruction.append("Contextual Instruction: The user is acknowledging your response (e.g. saying 'ok' or 'thanks'). Respond with exactly one short, polite sentence saying you're happy to help and asking if they have other questions about Shiva's projects or stack.\n\n");
        } else {
            boolean isRelated = containsAny(lowerMessage, "work", "job", "experience", "role", "company", "modlix", "career",
                    "project", "build", "create", "app", "demo", "github", "stack", "tech", "ai", "feature", "skills",
                    "personality", "interest", "goal", "youtube", "traits", "who are you", "who is shiva", "resume",
                    "education", "college", "degree", "study", "git", "contact", "email", "linkedin", "phone", "social", "built");

            if (!isRelated) {
                instruction.append("Contextual Instruction: The user's question is unrelated to Shiva. DO NOT introduce yourself, DO NOT apologize, and DO NOT offer help. Use exactly ONE of the 'funny_fallbacks' from the rules to jokingly redirect them, and then STOP. Do not write more than one sentence.\n\n");
            } else {
                instruction.append("Contextual Instruction: Be extremely direct and concise. DO NOT start your response with 'Hi', 'Hello', 'Hi there!', or 'Shiva is based in...'. Start immediately with the answer. Limit response to 2-3 short sentences or bullet points. Avoid long paragraph styles. Do not repeat contact info unless asked.\n\n");
            }
        }

        return instruction.toString();
    }

    private boolean isSimpleGreeting(String message) {
        Set<String> greetings = Set.of("hi", "hello", "hey", "how are you", "how are u", "gm", "gn", "good morning", "good evening");
        return greetings.contains(message) || (message.length() < 10 && containsAny(message, "hi", "hello", "hey"));
    }

    private boolean isAcknowledgment(String message) {
        Set<String> acks = Set.of(
            "ok", "okay", "okk", "okey", "k", "cool", "nice", "great", 
            "awesome", "fine", "sure", "thanks", "thank you", "thx", 
            "yep", "yes", "no", "perfect", "got it", "understood"
        );
        return acks.contains(message) || 
               (message.length() < 12 && (message.contains("thank") || message.contains("got it") || message.contains("ok")));
    }

    private boolean containsAny(String message, String... keywords) {
        return Stream.of(keywords).anyMatch(message::contains);
    }
}
