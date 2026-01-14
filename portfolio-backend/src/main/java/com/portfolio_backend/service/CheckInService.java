package com.portfolio_backend.service;

import com.portfolio_backend.dto.challenges.CheckInResponse;
import com.portfolio_backend.entity.challenges.Challenge;
import com.portfolio_backend.entity.challenges.DailyCheckIn;
import com.portfolio_backend.entity.challenges.Participation;
import com.portfolio_backend.repository.challenges.DailyCheckInRepository;
import com.portfolio_backend.repository.challenges.ParticipationRepository;
import com.portfolio_backend.repository.challenges.ChallengeRepository;
import com.portfolio_backend.util.IstTimeUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CheckInService {

    private final ParticipationRepository participationRepo;
    private final DailyCheckInRepository checkRepo;
    private final ChallengeRepository challengeRepo;

    @Transactional
    public CheckInResponse checkIn(UUID userId, UUID challengeId) {

        Challenge c = challengeRepo.findById(challengeId)
                .orElseThrow(() -> new RuntimeException("Challenge not found"));

        if (!IstTimeUtil.inWindow(c.getWindowStart(), c.getWindowEnd())) {
            throw new RuntimeException("Allowed only in challenge window");
        }

        LocalDate today = IstTimeUtil.today();

        Participation p = participationRepo
                .findByUserIdAndChallengeId(userId, challengeId)
                .orElseThrow(() -> new RuntimeException("User not joined"));

        if (checkRepo.existsByParticipationIdAndCheckInDate(p.getId(), today)) {
            throw new RuntimeException("Already checked in today");
        }

        LocalDate yesterday = today.minusDays(1);

        if (yesterday.equals(p.getLastCheckIn())) {
            p.setCurrentStreak(p.getCurrentStreak() + 1);
        } else {
            p.setCurrentStreak(1);
        }

        p.setLongestStreak(Math.max(p.getLongestStreak(), p.getCurrentStreak()));
        p.setLastCheckIn(today);
        p.setTotalCheckIns(p.getTotalCheckIns() + 1);

        participationRepo.save(p);

        DailyCheckIn d = new DailyCheckIn();
        d.setId(UUID.randomUUID());
        d.setParticipationId(p.getId());
        d.setCheckInDate(today);
        d.setVerificationPassed(true);

        checkRepo.save(d);

        return new CheckInResponse(p.getCurrentStreak(), p.getLongestStreak());
    }
}
