package com.portfolio_backend.checkin.service;

import com.portfolio_backend.checkin.dto.CheckInRequest;
import com.portfolio_backend.checkin.dto.CheckInResponse;
import com.portfolio_backend.checkin.dto.LeaderboardEntry;
import com.portfolio_backend.checkin.dto.VerificationQuestionDto;
import com.portfolio_backend.checkin.entity.DailyCheckIn;
import com.portfolio_backend.checkin.entity.Participation;
import com.portfolio_backend.checkin.entity.VerificationQuestion;
import com.portfolio_backend.checkin.exception.CheckInException;
import com.portfolio_backend.checkin.repository.DailyCheckInRepository;
import com.portfolio_backend.checkin.repository.ParticipationRepository;
import com.portfolio_backend.checkin.repository.VerificationQuestionRepository;
import com.portfolio_backend.common.util.AnswerHasher;
import com.portfolio_backend.common.util.IstTimeUtil;
import com.portfolio_backend.user.entity.User;
import com.portfolio_backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CheckInService {

    private static final LocalTime WINDOW_OPEN = LocalTime.of(5, 0);
    private static final LocalTime WINDOW_CLOSE = LocalTime.of(7, 0);

    private final ParticipationRepository participationRepo;
    private final DailyCheckInRepository checkRepo;
    private final VerificationQuestionRepository questionRepo;
    private final UserRepository userRepo;

    public List<LeaderboardEntry> getLeaderboard() {
        return participationRepo.findAllLeaderboard();
    }

    /**
     * The question rotates once per IST day, so everyone sees the same one and it is
     * stable across a page refresh mid-submission.
     */
    public VerificationQuestionDto getTodaysQuestion() {
        List<VerificationQuestion> activeQuestions = questionRepo.findAllByIsActiveTrueOrderByIdAsc();
        if (activeQuestions.isEmpty()) {
            throw new CheckInException("No verification questions found");
        }

        long dayIndex = IstTimeUtil.today().toEpochDay();
        VerificationQuestion question = activeQuestions.get((int) (dayIndex % activeQuestions.size()));

        return new VerificationQuestionDto(
                question.getId(),
                question.getQuestion(),
                question.getPlaceholder()
        );
    }

    @Transactional
    public CheckInResponse checkIn(CheckInRequest request) {
        if (!IstTimeUtil.inWindow(WINDOW_OPEN, WINDOW_CLOSE)) {
            throw new CheckInException("Submission window is closed. Please check in between 5:00 AM and 7:00 AM IST.");
        }

        String email = request.getEmail().trim().toLowerCase();
        String name = request.getName().trim();

        validateAnswer(request.getQuestionId(), request.getAnswer());

        User user = getOrCreateUser(email, name);
        Participation p = getOrCreateParticipation(user.getId());

        LocalDate today = IstTimeUtil.today();
        if (checkRepo.existsByParticipationIdAndCheckInDate(p.getId(), today)) {
            throw new CheckInException("Already checked in today");
        }

        updateStreaks(p, today);

        try {
            recordDailyCheckIn(p.getId(), today);
        } catch (DataIntegrityViolationException e) {
            // Two concurrent submissions can both pass the exists() check above; the
            // uk_daily_checkin unique constraint is what actually settles it. Report
            // that as the ordinary "already checked in" case rather than a 500.
            throw new CheckInException("Already checked in today");
        }

        String message = p.getCurrentStreak() > 1
                ? String.format("Streak continued! Day %d locked in. 🔥", p.getCurrentStreak())
                : "Welcome to the challenge! Day 1 locked in. 🔥";

        return new CheckInResponse(true, message, p.getCurrentStreak(), p.getLongestStreak());
    }

    private User getOrCreateUser(String email, String name) {
        return userRepo.findByEmail(email)
                .orElseGet(() -> userRepo.save(new User()
                        .setEmail(email)
                        .setName(name)
                        .setRole(User.Role.USER)));
    }

    private void validateAnswer(Long questionId, String answer) {
        questionRepo.findById(questionId)
                .filter(q -> q.getAnswerHash() != null
                        && q.getAnswerHash().equalsIgnoreCase(AnswerHasher.hash(answer)))
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
        checkRepo.saveAndFlush(new DailyCheckIn()
                .setParticipationId(participationId)
                .setCheckInDate(today)
                .setVerified(true));
    }
}
