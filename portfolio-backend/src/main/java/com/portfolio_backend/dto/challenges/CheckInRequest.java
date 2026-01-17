package com.portfolio_backend.dto.challenges;

import lombok.Data;
import java.util.UUID;

@Data
public class CheckInRequest {
    private UUID userId;
    private UUID questionId;
    private String answer;
}
