package com.portfolio_backend.controller;

import com.portfolio_backend.dto.challenges.CheckInRequest;
import com.portfolio_backend.dto.challenges.CheckInResponse;
import com.portfolio_backend.dto.challenges.LeaderboardEntry;
import com.portfolio_backend.entity.challenges.VerificationQuestion;
import com.portfolio_backend.service.CheckInService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/challenges")
@RequiredArgsConstructor
public class CheckInController {

    private final CheckInService checkInService;

    @GetMapping("/question")
    public VerificationQuestion getQuestion() {
        return checkInService.getRandomQuestion();
    }

    @GetMapping("/leaderboard")
    public List<LeaderboardEntry> getLeaderboard() {
        return checkInService.getLeaderboard();
    }

    @PostMapping("/checkin")
    public CheckInResponse checkIn(@RequestBody CheckInRequest request) {
        return checkInService.checkIn(request);
    }
}
