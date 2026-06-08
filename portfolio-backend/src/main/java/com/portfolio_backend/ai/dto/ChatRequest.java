package com.portfolio_backend.ai.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;

public record ChatRequest(
    @NotBlank(message = "Prompt cannot be blank")
    @Size(max = 3000, message = "Prompt cannot exceed 3000 characters")
    @JsonAlias("input")
    String prompt,

    List<ChatMessage> history
) {
    public record ChatMessage(
        String text,
        String sender // "user" or "ai"
    ) {}
}
