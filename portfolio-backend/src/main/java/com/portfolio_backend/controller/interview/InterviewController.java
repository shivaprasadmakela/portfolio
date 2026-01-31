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

    @GetMapping("/collections/{id}")
    public CollectionDto getCollection(@PathVariable Long id) {
        return interviewService.getCollection(id);
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

    @PostMapping("/admin/collections")
    public CollectionDto upsertCollection(@RequestBody CollectionDto dto) {
        return interviewService.upsertCollection(dto);
    }

    @DeleteMapping("/admin/collections/{id}")
    public void deleteCollection(@PathVariable Long id) {
        interviewService.deleteCollection(id);
    }
}
