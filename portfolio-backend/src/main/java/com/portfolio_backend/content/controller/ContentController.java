package com.portfolio_backend.content.controller;

import com.portfolio_backend.content.dto.CollectionDto;
import com.portfolio_backend.content.dto.QuestionDto;
import com.portfolio_backend.content.service.ContentAdminService;
import com.portfolio_backend.content.service.ContentQueryService;
import com.portfolio_backend.content.service.ContentSearchService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/interview") // Keeping the path for backward compatibility
@RequiredArgsConstructor
public class ContentController {

    private final ContentQueryService contentQueryService;
    private final ContentSearchService contentSearchService;
    private final ContentAdminService contentAdminService;

    @GetMapping("/categories")
    public List<CollectionDto> getCategories() {
        return contentQueryService.getAllCategories();
    }

    @GetMapping("/sets")
    public List<CollectionDto> getSets() {
        return contentQueryService.getAllSets();
    }

    @GetMapping("/collections/{identifier}")
    public CollectionDto getCollection(@PathVariable String identifier) {
        // Try to parse as Long (ID), else treat as slug
        try {
            Long id = Long.parseLong(identifier);
            return contentQueryService.getCollection(id);
        } catch (NumberFormatException e) {
            return contentQueryService.getCollectionBySlug(identifier);
        }
    }

    @GetMapping("/questions/{slug}")
    public QuestionDto getQuestion(@PathVariable String slug) {
        return contentQueryService.getQuestionBySlug(slug);
    }

    @GetMapping("/questions/search")
    public List<QuestionDto> searchQuestions(@RequestParam String q) {
        return contentSearchService.searchQuestions(q);
    }

    @GetMapping("/admin/questions")
    public List<QuestionDto> getAllQuestions() {
        return contentQueryService.getAllQuestions();
    }

    @PostMapping("/admin/questions")
    public QuestionDto upsertQuestion(@Valid @RequestBody QuestionDto dto) {
        return contentAdminService.upsertQuestion(dto);
    }

    @DeleteMapping("/admin/questions/{id}")
    public void deleteQuestion(@PathVariable Long id) {
        contentAdminService.deleteQuestion(id);
    }

    @PatchMapping("/admin/questions/{id}/publish")
    public QuestionDto publishQuestion(@PathVariable Long id) {
        QuestionDto dto = contentQueryService.getAllQuestions().stream()
                .filter(q -> q.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Question not found"));
        dto.setStatus("PUBLISHED");
        return contentAdminService.upsertQuestion(dto);
    }

    @PostMapping("/admin/collections")
    public CollectionDto upsertCollection(@Valid @RequestBody CollectionDto dto) {
        return contentAdminService.upsertCollection(dto);
    }

    @DeleteMapping("/admin/collections/{id}")
    public void deleteCollection(@PathVariable Long id) {
        contentAdminService.deleteCollection(id);
    }
}
