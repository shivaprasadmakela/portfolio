package com.portfolio_backend.service.ai;

import com.portfolio_backend.client.OpenAiClient;
import org.springframework.stereotype.Service;

@Service
public class AiService {

    private final OpenAiClient openAiClient;

    public AiService(OpenAiClient openAiClient) {
        this.openAiClient = openAiClient;
    }

    public String improveTitle(String title) {
        validate(title);
        String prompt = """
            As a professional blog editor, improve the following article title. 
            Provide 5 catchy, SEO-friendly variations as a simple numbered list. 
            Keep them relevant and punchy.
            
            Original Title: %s
            """.formatted(title);
        return openAiClient.call(prompt);
    }

    public String enhanceContent(String content) {
        validate(content);
        String prompt = """
            Improve the following blog content while maintaining its original meaning and tone:
            - Fix any grammatical or spelling errors
            - Improve sentence structure and clarity
            - Use professional and engaging language
            - Return ONLY the improved content in Markdown format
            
            Content to enhance:
            %s
            """.formatted(content);
        return openAiClient.call(prompt);
    }

    public String summarize(String content) {
        validate(content);
        String prompt = """
            Provide a concise, 2-3 sentence summary/excerpt for the following blog post. 
            This will be used as a search meta-description.
            
            Content:
            %s
            """.formatted(content);
        return openAiClient.call(prompt);
    }

    private void validate(String input) {
        if (input == null || input.trim().isEmpty()) {
            throw new IllegalArgumentException("Input content cannot be empty.");
        }
    }
}
