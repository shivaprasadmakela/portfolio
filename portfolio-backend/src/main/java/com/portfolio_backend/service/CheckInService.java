package com.portfolio_backend.service;

import com.portfolio_backend.exception.CheckInException;

import com.portfolio_backend.dto.challenges.CheckInRequest;
import com.portfolio_backend.dto.challenges.CheckInResponse;
import com.portfolio_backend.entity.challenges.DailyCheckIn;
import com.portfolio_backend.entity.challenges.Participation;
import com.portfolio_backend.repository.challenges.DailyCheckInRepository;
import com.portfolio_backend.repository.challenges.ParticipationRepository;
import com.portfolio_backend.repository.UserRepository;
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
import java.time.Instant;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class CheckInService {

    private final ParticipationRepository participationRepo;
    private final DailyCheckInRepository checkRepo;
    private final VerificationQuestionRepository questionRepo;
    private final UserRepository userRepo;

    public List<LeaderboardEntry> getLeaderboard() {
        return participationRepo.findAllLeaderboard();
    }

    public VerificationQuestion getRandomQuestion() {
        List<VerificationQuestion> activeQuestions = questionRepo.findAllByIsActiveTrueOrderByIdAsc();
        if (activeQuestions.isEmpty()) {
            throw new CheckInException("No verification questions found");
        }

        long dayIndex = IstTimeUtil.today().toEpochDay();
        int questionIndex = (int) (dayIndex % activeQuestions.size());

        return activeQuestions.get(questionIndex);
        
    }

    @Transactional
    public CheckInResponse checkIn(CheckInRequest request) {
        String email = request.getEmail().trim().toLowerCase();
        String name = request.getName().trim();

        com.portfolio_backend.entity.User user = getOrCreateUser(email, name);
        validateAnswer(request.getQuestionId(), request.getAnswer());
        Participation p = getOrCreateParticipation(user.getId());

        LocalDate today = IstTimeUtil.today();
        if (checkRepo.existsByParticipationIdAndCheckInDate(p.getId(), today)) {
            throw new CheckInException("Already checked in today");
        }

        updateStreaks(p, today);
        recordDailyCheckIn(p.getId(), today);

        String message = p.getCurrentStreak() > 1 
            ? String.format("Streak continued! Day %d locked in. 🔥", p.getCurrentStreak())
            : "Welcome to the challenge! Day 1 locked in. 🔥";

        return new CheckInResponse(true, message, p.getCurrentStreak(), p.getLongestStreak());
    }

    private com.portfolio_backend.entity.User getOrCreateUser(String email, String name) {
        return userRepo.findByEmail(email)
                .orElseGet(() -> userRepo.save(new com.portfolio_backend.entity.User()
                        .setEmail(email)
                        .setName(name)));
    }

    private void validateAnswer(Long questionId, String answer) {
        questionRepo.findById(questionId)
                .filter(q -> q.getAnswerHash().equals(hashAnswer(answer.trim().toLowerCase())))
                .orElseThrow(() -> new CheckInException("Incorrect answer. Please try again."));
    }

    private Participation getOrCreateParticipation(Long userId) {
        return participationRepo.findByUserId(userId)
                .orElseGet(() -> participationRepo.save(new Participation()
                        .setUserId(userId)
                        .setCurrentStreak(0)
                        .setLongestStreak(0)
                        .setTotalCheckIns(0)
                        .setStatus("ACTIVE")));
    }

    private void updateStreaks(Participation p, LocalDate today) {
        LocalDate yesterday = today.minusDays(1);
        LocalDate lastCheckInDate = IstTimeUtil.toLocalDate(p.getLastCheckIn());

        p.setCurrentStreak(yesterday.equals(lastCheckInDate) ? p.getCurrentStreak() + 1 : 1);
        p.setLongestStreak(Math.max(p.getLongestStreak(), p.getCurrentStreak()));
        p.setLastCheckIn(Instant.now());
        p.setTotalCheckIns(p.getTotalCheckIns() + 1);

        participationRepo.save(p);
    }

    private void recordDailyCheckIn(Long participationId, LocalDate today) {
        checkRepo.save(new DailyCheckIn()
                .setParticipationId(participationId)
                .setCheckInDate(today)
                .setVerified(true));
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
