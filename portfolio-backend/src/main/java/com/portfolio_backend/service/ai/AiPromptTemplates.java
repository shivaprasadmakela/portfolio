package com.portfolio_backend.service.ai;

public final class AiPromptTemplates {

    private AiPromptTemplates() {
        // Prevent instantiation
    }

    public static final String IMPROVE_TITLE_PROMPT = """
            Improve the following article title.
            Provide 5 catchy variations using simple words and easy-to-understand English.
            Avoid complex jargon. Keep them punchy and clear.
            Return ONLY a valid JSON object in the following format:
            {
                "variations": ["variation 1", "variation 2", ...],
                "explanation": "concise reasoning in simple words"
            }

            Original Title: %s
            """;

    public static final String ENHANCE_CONTENT_PROMPT = """
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
            """;

    public static final String SUMMARIZE_PROMPT = """
            Provide a very simple, 2-3 sentence summary for the following blog post.
            Use basic words that a general audience will easily understand.
            Return ONLY a valid JSON object in the following format:
            {
                "summary": "the summary text here"
            }

            Content:
            %s
            """;
}
