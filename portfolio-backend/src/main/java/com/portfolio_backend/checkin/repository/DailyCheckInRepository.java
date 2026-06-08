package com.portfolio_backend.checkin.repository;

import com.portfolio_backend.checkin.entity.DailyCheckIn;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;

public interface DailyCheckInRepository extends JpaRepository<DailyCheckIn, Long> {
    boolean existsByParticipationIdAndCheckInDate(Long pid, LocalDate date);
}
