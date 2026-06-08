package com.portfolio_backend.checkin.repository;

import com.portfolio_backend.checkin.entity.Participation;
import com.portfolio_backend.checkin.dto.LeaderboardEntry;
import com.portfolio_backend.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.Optional;
import java.util.List;

public interface ParticipationRepository extends JpaRepository<Participation, Long> {

    Optional<Participation> findByUserId(Long userId);

    @Query("SELECT new com.portfolio_backend.checkin.dto.LeaderboardEntry(u.name, p.currentStreak, p.longestStreak, p.lastCheckIn) " +
           "FROM Participation p JOIN User u ON p.userId = u.id " +
           "WHERE p.status = 'ACTIVE' " +
           "ORDER BY p.currentStreak DESC, p.lastCheckIn DESC")
    List<LeaderboardEntry> findAllLeaderboard();
}
