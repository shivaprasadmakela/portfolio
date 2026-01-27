package com.portfolio_backend.dto.challenges;

import lombok.Data;

@Data
public class CheckInRequest {
    private String name;
    private String email;
    private Long questionId;
    private String answer;
}
