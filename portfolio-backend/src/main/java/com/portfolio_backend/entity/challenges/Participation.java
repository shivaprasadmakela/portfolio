package com.portfolio_backend.entity.challenges;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(
        name = "user_challenge_participation",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id","challenge_id"})
)
@Data
public class Participation {

    @Id
    private UUID id;

    private UUID userId;

    private UUID challengeId;

    private int currentStreak;

    private int longestStreak;

    private LocalDate lastCheckIn;

    private int totalCheckIns;

    private String status;
}
