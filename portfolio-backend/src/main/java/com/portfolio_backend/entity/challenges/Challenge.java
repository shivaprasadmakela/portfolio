package com.portfolio_backend.entity.challenges;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import java.time.LocalTime;
import java.util.UUID;

@Entity
@Table(name = "challenges")
@Data
public class Challenge {

    @Id
    private UUID id;

    private String title;

    private String description;

    private LocalTime windowStart;

    private LocalTime windowEnd;

    private int durationDays;

    private Boolean isActive;
}
