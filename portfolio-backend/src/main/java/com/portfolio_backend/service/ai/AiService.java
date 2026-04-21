package com.portfolio_backend.service.ai;

import com.portfolio_backend.client.GeminiClient;
import org.springframework.stereotype.Service;

@Service
public class AiService {

    private final GeminiClient geminiClient;

    public AiService(GeminiClient geminiClient) {
        this.geminiClient = geminiClient;
    }

    public String improveTitle(String title) {
        validate(title);
        String prompt = """
            As a professional blog editor, improve the following article title. 
            Provide 5 catchy, SEO-friendly variations.
            Return ONLY a valid JSON object in the following format:
            {
                "variations": ["variation 1", "variation 2", ...],
                "explanation": "concise reasoning"
            }
            
            Original Title: %s
            """.formatted(title);
        return cleanResponse(geminiClient.call(prompt));
    }

    public String enhanceContent(String content) {
        validate(content);
        String prompt = """
            Improve the following blog content while maintaining its original meaning and tone:
            - Fix any grammatical or spelling errors
            - Improve sentence structure and clarity
            - Use professional and engaging language
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
            Provide a concise, 2-3 sentence summary/excerpt for the following blog post. 
            This will be used as a search meta-description.
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
        if (response == null) return "{}";
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
