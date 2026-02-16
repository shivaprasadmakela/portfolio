package com.portfolio_backend.dto.interview;

import lombok.Data;
import java.util.List;

@Data
public class QuestionDto {
    private Long id;
    private String title;
    private String slug;
    private String summary;
    private String contentHtml;
    private String solutionMd;
    private String difficulty;
    private String status;
    private Long views;
    private List<String> tags;
    private List<Long> collectionIds;
    private Long createdBy;
}
