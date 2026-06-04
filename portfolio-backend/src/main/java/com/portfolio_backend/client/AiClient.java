package com.portfolio_backend.client;

import com.portfolio_backend.dto.ai.AiRequest.ChatMessage;
import java.util.List;

public interface AiClient {
    String call(String prompt);
    String call(String systemInstruction, List<ChatMessage> history, String currentInput);
}
