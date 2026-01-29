package com.portfolio_backend.entity.challenges;

import com.portfolio_backend.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.Accessors;
import java.time.Instant;

@Entity
@Table(name = "user_participation")
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Accessors(chain = true)
public class Participation extends BaseEntity<Participation> {

    private Long userId;

    private int currentStreak;

    private int longestStreak;

    private Instant lastCheckIn;

    private int totalCheckIns;

    private String status;
}
