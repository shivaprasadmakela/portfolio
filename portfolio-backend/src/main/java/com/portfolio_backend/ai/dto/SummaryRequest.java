package com.portfolio_backend.ai.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SummaryRequest(
    @NotBlank(message = "Prompt cannot be blank")
    @Size(max = 10000, message = "Prompt cannot exceed 10000 characters")
    @JsonAlias("input")
    String prompt
) {}
