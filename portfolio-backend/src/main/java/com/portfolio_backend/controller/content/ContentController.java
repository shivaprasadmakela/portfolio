package com.portfolio_backend.controller.content;

import com.portfolio_backend.dto.interview.CollectionDto;
import com.portfolio_backend.dto.interview.QuestionDto;
import com.portfolio_backend.service.content.ContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/interview") // Keeping the path for backward compatibility
@RequiredArgsConstructor
public class ContentController {

    private final ContentService contentService;

    @GetMapping("/categories")
    public List<CollectionDto> getCategories() {
        return contentService.getAllCategories();
    }

    @GetMapping("/sets")
    public List<CollectionDto> getSets() {
        return contentService.getAllSets();
    }

    @GetMapping("/collections/{identifier}")
    public CollectionDto getCollection(@PathVariable String identifier) {
        // Try to parse as Long (ID), else treat as slug
        try {
            Long id = Long.parseLong(identifier);
            return contentService.getCollection(id);
        } catch (NumberFormatException e) {
            return contentService.getCollectionBySlug(identifier);
        }
    }

    @GetMapping("/questions/{slug}")
    public QuestionDto getQuestion(@PathVariable String slug) {
        return contentService.getQuestionBySlug(slug);
    }

    @GetMapping("/questions/search")
    public List<QuestionDto> searchQuestions(@RequestParam String q) {
        return contentService.searchQuestions(q);
    }

    @GetMapping("/admin/questions")
    public List<QuestionDto> getAllQuestions() {
        return contentService.getAllQuestions();
    }

    @PostMapping("/admin/questions")
    public QuestionDto upsertQuestion(@RequestBody QuestionDto dto) {
        return contentService.upsertQuestion(dto);
    }

    @DeleteMapping("/admin/questions/{id}")
    public void deleteQuestion(@PathVariable Long id) {
        contentService.deleteQuestion(id);
    }

    @PatchMapping("/admin/questions/{id}/publish")
    public QuestionDto publishQuestion(@PathVariable Long id) {
        QuestionDto dto = contentService.getAllQuestions().stream()
                .filter(q -> q.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Question not found"));
        dto.setStatus("PUBLISHED");
        return contentService.upsertQuestion(dto);
    }

    @PostMapping("/admin/collections")
    public CollectionDto upsertCollection(@RequestBody CollectionDto dto) {
        return contentService.upsertCollection(dto);
    }

    @DeleteMapping("/admin/collections/{id}")
    public void deleteCollection(@PathVariable Long id) {
        contentService.deleteCollection(id);
    }
}
