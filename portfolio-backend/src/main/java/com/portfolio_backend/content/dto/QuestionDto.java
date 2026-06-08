package com.portfolio_backend.content.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.util.List;

@Data
public class QuestionDto {
    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    private String slug;
    private String summary;
    private String contentHtml;
    private String solutionMd;

    @NotBlank(message = "Difficulty is required")
    private String difficulty;

    private String status;
    private Long views;
    private List<String> tags;
    private List<Long> collectionIds;
    private Long createdBy;
}
