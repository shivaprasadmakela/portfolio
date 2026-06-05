package com.portfolio_backend.client;

import com.portfolio_backend.dto.ai.AiRequest.ChatMessage;
import com.portfolio_backend.exception.ai.RateLimitException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Primary
public class FallbackAiClient implements AiClient {

    private static final Logger logger = LoggerFactory.getLogger(FallbackAiClient.class);

    private static final String RATE_LIMIT_FALLBACK = 
        "Oof! I've talked too much today and my brain is overloaded (daily limit reached). 🥤 Ask Shiva directly, or try again in a bit!";
    private static final String ERROR_FALLBACK = 
        "Yikes! My server wires crossed and I had a minor short circuit. ⚡ Try again in a moment, or reach out to Shiva Mekala directly!";

    private final DirectGeminiClient geminiClient;
    private final OpenRouterClient openRouterClient;

    @Value("${ai.provider:fallback}")
    private String provider;

    @Value("${ai.fallback.cooldown-ms:3600000}")
    private long cooldownMs;

    private volatile long geminiBlockedUntil = 0L;

    public FallbackAiClient(DirectGeminiClient geminiClient, OpenRouterClient openRouterClient) {
        this.geminiClient = geminiClient;
        this.openRouterClient = openRouterClient;
    }

    private boolean isGeminiBlocked() {
        return System.currentTimeMillis() < geminiBlockedUntil;
    }

    @Override
    public String call(String prompt) {
        if ("openrouter".equalsIgnoreCase(provider)) {
            logger.info("Routing call directly to OpenRouter.");
            return openRouterClient.call(prompt);
        }
        if ("gemini".equalsIgnoreCase(provider)) {
            logger.info("Routing call directly to Gemini.");
            try {
                return geminiClient.call(prompt);
            } catch (RateLimitException e) {
                logger.warn("Gemini rate limit exceeded in direct mode.");
                return RATE_LIMIT_FALLBACK;
            } catch (Exception e) {
                logger.error("Error calling Gemini in direct mode", e);
                return ERROR_FALLBACK;
            }
        }

        // Default: fallback mode
        if (isGeminiBlocked()) {
            logger.info("Gemini is in cooldown block. Routing directly to OpenRouter.");
            try {
                return openRouterClient.call(prompt);
            } catch (RateLimitException ex) {
                logger.error("OpenRouter rate limit reached during cooldown bypass.", ex);
                return RATE_LIMIT_FALLBACK;
            } catch (Exception ex) {
                logger.error("Error calling OpenRouter during cooldown bypass", ex);
                return ERROR_FALLBACK;
            }
        }

        logger.info("Routing call to Gemini with OpenRouter fallback.");
        try {
            return geminiClient.call(prompt);
        } catch (RateLimitException e) {
            logger.warn("Gemini rate limit reached. Triggering cooldown block and falling back to OpenRouter.");
            geminiBlockedUntil = System.currentTimeMillis() + cooldownMs;
            try {
                return openRouterClient.call(prompt);
            } catch (RateLimitException ex) {
                logger.error("OpenRouter rate limit reached during fallback.", ex);
                return RATE_LIMIT_FALLBACK;
            } catch (Exception ex) {
                logger.error("Error calling OpenRouter during fallback", ex);
                return ERROR_FALLBACK;
            }
        } catch (Exception e) {
            logger.error("Error calling Gemini. Attempting fallback to OpenRouter.", e);
            try {
                return openRouterClient.call(prompt);
            } catch (Exception ex) {
                logger.error("Error calling OpenRouter during fallback", ex);
                return ERROR_FALLBACK;
            }
        }
    }

    @Override
    public String call(String systemInstruction, List<ChatMessage> history, String currentInput) {
        if ("openrouter".equalsIgnoreCase(provider)) {
            logger.info("Routing chat directly to OpenRouter.");
            return openRouterClient.call(systemInstruction, history, currentInput);
        }
        if ("gemini".equalsIgnoreCase(provider)) {
            logger.info("Routing chat directly to Gemini.");
            try {
                return geminiClient.call(systemInstruction, history, currentInput);
            } catch (RateLimitException e) {
                logger.warn("Gemini rate limit exceeded in direct mode.");
                return RATE_LIMIT_FALLBACK;
            } catch (Exception e) {
                logger.error("Error calling Gemini in direct mode", e);
                return ERROR_FALLBACK;
            }
        }

        // Default: fallback mode
        if (isGeminiBlocked()) {
            logger.info("Gemini is in cooldown block. Routing chat directly to OpenRouter.");
            try {
                return openRouterClient.call(systemInstruction, history, currentInput);
            } catch (RateLimitException ex) {
                logger.error("OpenRouter rate limit reached during cooldown bypass.", ex);
                return RATE_LIMIT_FALLBACK;
            } catch (Exception ex) {
                logger.error("Error calling OpenRouter during cooldown bypass", ex);
                return ERROR_FALLBACK;
            }
        }

        logger.info("Routing chat to Gemini with OpenRouter fallback.");
        try {
            return geminiClient.call(systemInstruction, history, currentInput);
        } catch (RateLimitException e) {
            logger.warn("Gemini rate limit reached. Triggering cooldown block and falling back to OpenRouter.");
            geminiBlockedUntil = System.currentTimeMillis() + cooldownMs;
            try {
                return openRouterClient.call(systemInstruction, history, currentInput);
            } catch (RateLimitException ex) {
                logger.error("OpenRouter rate limit reached during fallback.", ex);
                return RATE_LIMIT_FALLBACK;
            } catch (Exception ex) {
                logger.error("Error calling OpenRouter during fallback", ex);
                return ERROR_FALLBACK;
            }
        } catch (Exception e) {
            logger.error("Error calling Gemini. Attempting fallback to OpenRouter.", e);
            try {
                return openRouterClient.call(systemInstruction, history, currentInput);
            } catch (Exception ex) {
                logger.error("Error calling OpenRouter during fallback", ex);
                return ERROR_FALLBACK;
            }
        }
    }
}
