package com.portfolio_backend.ai.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;

public record ChatRequest(
    @NotBlank(message = "Prompt cannot be blank")
    @Size(max = 3000, message = "Prompt cannot exceed 3000 characters")
    @JsonAlias("input")
    String prompt,

    // Bounded so a caller cannot inflate the token cost of a single request.
    // Only the last 10 entries are ever sent upstream; the cap guards the
    // parsing and transport cost of everything beyond that.
    @Size(max = 20, message = "History cannot exceed 20 messages")
    List<@Valid ChatMessage> history
) {
    public record ChatMessage(
        @Size(max = 3000, message = "History message cannot exceed 3000 characters")
        String text,
        String sender // "user" or "ai"
    ) {}
}
