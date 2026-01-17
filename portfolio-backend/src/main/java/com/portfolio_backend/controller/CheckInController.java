package com.portfolio_backend.controller;

import com.portfolio_backend.dto.challenges.CheckInRequest;
import com.portfolio_backend.dto.challenges.CheckInResponse;
import com.portfolio_backend.dto.challenges.LeaderboardEntry;
import com.portfolio_backend.entity.challenges.VerificationQuestion;
import com.portfolio_backend.service.CheckInService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/challenges")
@RequiredArgsConstructor
public class CheckInController {

    private final CheckInService checkInService;

    @GetMapping("/question")
    public VerificationQuestion getQuestion() {
        return checkInService.getRandomQuestion();
    }

    @GetMapping("/{challengeId}/leaderboard")
    public List<LeaderboardEntry> getLeaderboard(@PathVariable UUID challengeId) {
        return checkInService.getLeaderboard(challengeId);
    }

    @PostMapping("/{challengeId}/checkin")
    public CheckInResponse checkIn(@PathVariable UUID challengeId, @RequestBody CheckInRequest request) {
        return checkInService.checkIn(request.getUserId(), challengeId, request.getQuestionId(), request.getAnswer());
    }
}
