package com.portfolio_backend.repository.challenges;

import com.portfolio_backend.entity.challenges.Participation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface ParticipationRepository extends JpaRepository<Participation, UUID> {
    Optional<Participation> findByUserIdAndChallengeId(UUID userId, UUID challengeId);
}
