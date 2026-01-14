package com.portfolio_backend.controller;

import com.portfolio_backend.dto.challenges.CheckInResponse;
import com.portfolio_backend.service.CheckInService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/challenges")
@RequiredArgsConstructor
public class CheckInController {

    private final CheckInService checkInService;

    @PostMapping("/{challengeId}/checkin")
    public CheckInResponse checkIn(@PathVariable UUID challengeId, @RequestParam UUID userId) {
        return checkInService.checkIn(userId, challengeId);
    }
}
