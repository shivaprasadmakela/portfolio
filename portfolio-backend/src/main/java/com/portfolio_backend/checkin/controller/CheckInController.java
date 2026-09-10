package com.portfolio_backend.checkin.controller;

import com.portfolio_backend.checkin.dto.CheckInRequest;
import com.portfolio_backend.checkin.dto.CheckInResponse;
import com.portfolio_backend.checkin.dto.LeaderboardEntry;
import com.portfolio_backend.checkin.dto.VerificationQuestionDto;
import com.portfolio_backend.checkin.service.CheckInService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/challenges")
@RequiredArgsConstructor
public class CheckInController {

    private final CheckInService checkInService;

    @GetMapping("/question")
    public VerificationQuestionDto getQuestion() {
        return checkInService.getTodaysQuestion();
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
