package com.portfolio_backend.dto.challenges;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CheckInResponse {
    private int currentStreak;
    private int longestStreak;
}
