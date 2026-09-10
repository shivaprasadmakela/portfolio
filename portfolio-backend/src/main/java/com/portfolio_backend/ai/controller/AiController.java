package com.portfolio_backend.ai.controller;

import com.portfolio_backend.ai.dto.ChatRequest;
import com.portfolio_backend.ai.dto.ChatResponse;
import com.portfolio_backend.ai.service.AiService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(@Valid @RequestBody ChatRequest request) {
        String res = aiService.chatAboutMe(request.prompt(), request.history());
        return ResponseEntity.ok(new ChatResponse(res));
    }
}
