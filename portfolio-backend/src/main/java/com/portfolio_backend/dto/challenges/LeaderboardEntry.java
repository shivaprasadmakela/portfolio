package com.portfolio_backend.dto.challenges;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LeaderboardEntry {
    private String name;
    private int currentStreak;
    private int longestStreak;
    private LocalDateTime lastCheckIn;
}
