package com.portfolio_backend.dto.challenges;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LeaderboardEntry {
    private String name;
    private String email;
    private int currentStreak;
    private int longestStreak;
    private LocalDate lastCheckIn;
}
