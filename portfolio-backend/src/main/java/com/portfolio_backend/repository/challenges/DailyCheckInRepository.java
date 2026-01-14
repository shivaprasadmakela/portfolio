package com.portfolio_backend.repository.challenges;

import com.portfolio_backend.entity.challenges.DailyCheckIn;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.UUID;

public interface DailyCheckInRepository extends JpaRepository<DailyCheckIn, UUID> {
    boolean existsByParticipationIdAndCheckInDate(UUID pid, LocalDate date);
}
