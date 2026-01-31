package com.portfolio_backend.dto.interview;

import lombok.Data;
import java.util.List;

@Data
public class QuestionDto {
    private Long id;
    private String title;
    private String summary;
    private String contentHtml;
    private String solutionMd;
    private String difficulty;
    private Long views;
    private List<String> tags;
    private Boolean isPublished;
    private List<Long> collectionIds;
}
