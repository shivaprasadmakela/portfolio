package com.portfolio_backend.ai.client;

import com.portfolio_backend.ai.dto.ChatRequest.ChatMessage;
import java.util.List;

public interface AiClient {
    String call(String prompt);
    String call(String systemInstruction, List<ChatMessage> history, String currentInput);
}
