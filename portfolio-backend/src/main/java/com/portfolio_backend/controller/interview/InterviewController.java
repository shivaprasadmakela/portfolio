package com.portfolio_backend.controller.interview;

import com.portfolio_backend.dto.interview.CollectionDto;
import com.portfolio_backend.dto.interview.QuestionDto;
import com.portfolio_backend.service.interview.InterviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/interview")
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewService interviewService;

    @GetMapping("/categories")
    public List<CollectionDto> getCategories() {
        return interviewService.getAllCategories();
    }

    @GetMapping("/sets")
    public List<CollectionDto> getSets() {
        return interviewService.getAllSets();
    }

    @GetMapping("/collections/{identifier}")
    public CollectionDto getCollection(@PathVariable String identifier) {
        // Try to parse as Long (ID), else treat as slug
        try {
            Long id = Long.parseLong(identifier);
            return interviewService.getCollection(id);
        } catch (NumberFormatException e) {
            return interviewService.getCollectionBySlug(identifier);
        }
    }

    @GetMapping("/questions/{slug}")
    public QuestionDto getQuestion(@PathVariable String slug) {
        return interviewService.getQuestionBySlug(slug);
    }

    @GetMapping("/questions/search")
    public List<QuestionDto> searchQuestions(@RequestParam String q) {
        return interviewService.searchQuestions(q);
    }

    @GetMapping("/admin/questions")
    public List<QuestionDto> getAllQuestions() {
        return interviewService.getAllQuestions();
    }

    @PostMapping("/admin/questions")
    public QuestionDto upsertQuestion(@RequestBody QuestionDto dto) {
        return interviewService.upsertQuestion(dto);
    }

    @DeleteMapping("/admin/questions/{id}")
    public void deleteQuestion(@PathVariable Long id) {
        interviewService.deleteQuestion(id);
    }

    @PatchMapping("/admin/questions/{id}/publish")
    public QuestionDto publishQuestion(@PathVariable Long id) {
        QuestionDto dto = interviewService.getAllQuestions().stream()
                .filter(q -> q.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Question not found"));
        dto.setStatus("PUBLISHED");
        return interviewService.upsertQuestion(dto);
    }

    @PostMapping("/admin/collections")
    public CollectionDto upsertCollection(@RequestBody CollectionDto dto) {
        return interviewService.upsertCollection(dto);
    }

    @DeleteMapping("/admin/collections/{id}")
    public void deleteCollection(@PathVariable Long id) {
        interviewService.deleteCollection(id);
    }
}
