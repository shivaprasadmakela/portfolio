package com.portfolio_backend.dto.interview;

import lombok.Data;
import java.util.List;
import java.time.LocalDate;

@Data
public class CollectionDto {
    private Long id;
    private String name;
    private String description;
    private String thumbnailUrl;
    private String icon;
    private String videoId;
    private LocalDate publishDate;
    private String type; // CATEGORY, YOUTUBE_SET
    private List<QuestionDto> questions;
    private int questionCount;
}
