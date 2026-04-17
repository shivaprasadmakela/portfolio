package com.portfolio_backend.controller.ai;

import com.portfolio_backend.dto.ai.AiRequest;
import com.portfolio_backend.dto.ai.AiResponse;
import com.portfolio_backend.service.ai.AiService;
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
    public ResponseEntity<AiResponse> improveTitle(@RequestBody AiRequest request) {
        String res = aiService.improveTitle(request.getInput());
        return ResponseEntity.ok(new AiResponse(res));
    }

    @PostMapping("/enhance-content")
    public ResponseEntity<AiResponse> enhanceContent(@RequestBody AiRequest request) {
        String res = aiService.enhanceContent(request.getInput());
        return ResponseEntity.ok(new AiResponse(res));
    }

    @PostMapping("/summarize")
    public ResponseEntity<AiResponse> summarize(@RequestBody AiRequest request) {
        String res = aiService.summarize(request.getInput());
        return ResponseEntity.ok(new AiResponse(res));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<AiResponse> handleValidation(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(new AiResponse(e.getMessage()));
    }
}
