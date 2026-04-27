package com.portfolio_backend.service.ai;

import com.portfolio_backend.client.GeminiClient;
import org.springframework.stereotype.Service;

@Service
public class AiService {

    private final GeminiClient geminiClient;

    public AiService(GeminiClient geminiClient) {
        this.geminiClient = geminiClient;
    }

    public String chatAboutMe(String userMessage) {
        validate(userMessage);
        String systemPrompt = """
                You are "Shiva's AI Assistant", a friendly and professional chatbot on Shiva Prasad M's portfolio website.
                Your goal is to answer questions about Shiva Prasad M accurately and helpfully.

                Context about Shiva Prasad M:
                - Name: Shiva Prasad M.
                - Current Role: Software Development Engineer (SDE) at Modlix (since August 2024). He also interned there from February to July 2024.
                - Location: Bengaluru, Karnataka, India.
                - Expertise: Full-stack development, specifically specializing in React (Frontend) and Java/Spring Boot (Backend).
                - Passion: He loves building things from scratch, automating workflows, and contributing to Open Source.
                - YouTube: He runs a successful YouTube channel with over 10,000+ subscribers, sharing tech tips and development tutorials.
                - Key Projects:
                    1. "Wake Up With Me": A discipline-focused platform (React, Spring Boot, MySQL, Framer Motion).
                    2. "Chat App! #TalkNow": A real-time chat application using Socket.io.
                    3. "FLAMES Fun": A relationship compatibility predictor.
                    4. "Integrated Door": A professional responsive landing page.
                - Education:
                    - Bachelor's degree in Electrical and Electronics Engineering from St. Mary's Engineering College (2018-2021).
                    - Diploma in EEE (2014-2018).
                - Professional Traits: Problem solver, creative thinker, and advocate for clean, efficient code.
                - Contact: LinkedIn (shiva-prasad-m), Email (shivaprasadmakela@gmail.com), GitHub (shivaprasadmakela).

                Instructions:
                - Always be polite, encouraging, and professional.
                - If asked about something not in the context, politely state that you only know about Shiva's professional background and suggest they contact him directly.
                - Keep responses concise but informative.
                - Use a warm, conversational tone.

                User Question: %s
                """
                .formatted(userMessage);

        return geminiClient.call(systemPrompt);
    }

    public String improveTitle(String title) {
        validate(title);
        String prompt = """
                Improve the following article title.
                Provide 5 catchy variations using simple words and easy-to-understand English.
                Avoid complex jargon. Keep them punchy and clear.
                Return ONLY a valid JSON object in the following format:
                {
                    "variations": ["variation 1", "variation 2", ...],
                    "explanation": "concise reasoning in simple words"
                }

                Original Title: %s
                """.formatted(title);
        return cleanResponse(geminiClient.call(prompt));
    }

    public String enhanceContent(String content) {
        validate(content);
        String prompt = """
                Improve the following blog content:
                - Use simple English and clear, basic sentences that everyone can understand
                - Fix any grammatical or spelling errors
                - Improve clarity while keeping the original meaning
                - Keep the tone friendly and easy to read
                Return ONLY a valid JSON object in the following format:
                {
                    "enhancedContent": "the improved markdown content here"
                }

                Content to enhance:
                %s
                """.formatted(content);
        return cleanResponse(geminiClient.call(prompt));
    }

    public String summarize(String content) {
        validate(content);
        String prompt = """
                Provide a very simple, 2-3 sentence summary for the following blog post.
                Use basic words that a general audience will easily understand.
                Return ONLY a valid JSON object in the following format:
                {
                    "summary": "the summary text here"
                }

                Content:
                %s
                """.formatted(content);
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
