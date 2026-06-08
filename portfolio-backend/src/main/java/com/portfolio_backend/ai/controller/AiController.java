package com.portfolio_backend.ai.controller;

import com.portfolio_backend.ai.dto.ChatRequest;
import com.portfolio_backend.ai.dto.ChatResponse;
import com.portfolio_backend.ai.dto.SummaryRequest;
import com.portfolio_backend.ai.service.AiService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/improve-title")
    public ResponseEntity<ChatResponse> improveTitle(@Valid @RequestBody SummaryRequest request) {
        String res = aiService.improveTitle(request.prompt());
        return ResponseEntity.ok(new ChatResponse(res));
    }

    @PostMapping("/enhance-content")
    public ResponseEntity<ChatResponse> enhanceContent(@Valid @RequestBody SummaryRequest request) {
        String res = aiService.enhanceContent(request.prompt());
        return ResponseEntity.ok(new ChatResponse(res));
    }

    @PostMapping("/summarize")
    public ResponseEntity<ChatResponse> summarize(@Valid @RequestBody SummaryRequest request) {
        String res = aiService.summarize(request.prompt());
        return ResponseEntity.ok(new ChatResponse(res));
    }

    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(@Valid @RequestBody ChatRequest request) {
        String res = aiService.chatAboutMe(request.prompt(), request.history());
        return ResponseEntity.ok(new ChatResponse(res));
    }
}
