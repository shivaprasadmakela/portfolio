package com.portfolio_backend.repository.challenges;

import com.portfolio_backend.entity.challenges.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface ChallengeRepository extends JpaRepository<Challenge, UUID> {
}
