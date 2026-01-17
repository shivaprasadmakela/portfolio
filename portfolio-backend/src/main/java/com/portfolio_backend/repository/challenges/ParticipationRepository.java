package com.portfolio_backend.repository.challenges;

import com.portfolio_backend.entity.challenges.Participation;
import org.springframework.data.jpa.repository.JpaRepository;
import com.portfolio_backend.dto.challenges.LeaderboardEntry;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ParticipationRepository extends JpaRepository<Participation, UUID> {
    Optional<Participation> findByUserIdAndChallengeId(UUID userId, UUID challengeId);

    @Query("SELECT new com.portfolio_backend.dto.challenges.LeaderboardEntry(u.name, u.email, p.currentStreak, p.longestStreak, p.lastCheckIn) " +
           "FROM Participation p JOIN User u ON p.userId = u.id " +
           "WHERE p.challengeId = :challengeId " +
           "ORDER BY p.currentStreak DESC, p.longestStreak DESC")
    List<LeaderboardEntry> findLeaderboardByChallengeId(@Param("challengeId") UUID challengeId);
}
