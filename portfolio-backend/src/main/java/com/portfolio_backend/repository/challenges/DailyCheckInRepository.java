package com.portfolio_backend.repository.challenges;

import com.portfolio_backend.entity.challenges.DailyCheckIn;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;

public interface DailyCheckInRepository extends JpaRepository<DailyCheckIn, Long> {
    boolean existsByParticipationIdAndCheckInDate(Long pid, LocalDate date);
}
