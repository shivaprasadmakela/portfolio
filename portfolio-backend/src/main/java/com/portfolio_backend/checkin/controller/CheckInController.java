package com.portfolio_backend.checkin.controller;

import com.portfolio_backend.checkin.dto.CheckInRequest;
import com.portfolio_backend.checkin.dto.CheckInResponse;
import com.portfolio_backend.checkin.dto.LeaderboardEntry;
import com.portfolio_backend.checkin.entity.VerificationQuestion;
import com.portfolio_backend.checkin.service.CheckInService;
import jakarta.validation.Valid;
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
    public CheckInResponse checkIn(@Valid @RequestBody CheckInRequest request) {
        return checkInService.checkIn(request);
    }
}
