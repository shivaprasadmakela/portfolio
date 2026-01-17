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
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Formatter;

import com.portfolio_backend.entity.challenges.VerificationQuestion;
import com.portfolio_backend.repository.challenges.VerificationQuestionRepository;
import java.util.List;
import com.portfolio_backend.dto.challenges.LeaderboardEntry;
import java.time.LocalDate;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CheckInService {

    private final ParticipationRepository participationRepo;
    private final DailyCheckInRepository checkRepo;
    private final ChallengeRepository challengeRepo;
    private final VerificationQuestionRepository questionRepo;

    public List<LeaderboardEntry> getLeaderboard(UUID challengeId) {
        return participationRepo.findLeaderboardByChallengeId(challengeId);
    }

    public VerificationQuestion getRandomQuestion() {
        return questionRepo.findRandomQuestion()
                .orElseThrow(() -> new RuntimeException("No verification questions found"));
    }

    @Transactional
    public CheckInResponse checkIn(UUID userId, UUID challengeId, UUID questionId, String answer) {

        VerificationQuestion q = questionRepo.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        if (answer == null || !hashAnswer(answer.trim().toLowerCase()).equals(q.getAnswerHash())) {
            throw new RuntimeException("Incorrect answer. Please try again.");
        }

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
        d.setVerified(true);

        checkRepo.save(d);

        return new CheckInResponse(p.getCurrentStreak(), p.getLongestStreak());
    }

    private String hashAnswer(String answer) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(answer.getBytes());
            return bytesToHex(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing answer", e);
        }
    }

    private String bytesToHex(byte[] bytes) {
        Formatter formatter = new Formatter();
        for (byte b : bytes) {
            formatter.format("%02x", b);
        }
        String result = formatter.toString();
        formatter.close();
        return result;
    }
}
