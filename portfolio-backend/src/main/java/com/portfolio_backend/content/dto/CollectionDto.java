package com.portfolio_backend.content.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.util.List;
import java.time.LocalDate;

@Data
public class CollectionDto {
    private Long id;

    @NotBlank(message = "Collection name is required")
    private String name;

    private String slug;
    private String description;
    private String thumbnailUrl;
    private String icon;
    private String videoId;
    private LocalDate publishDate;

    @NotBlank(message = "Collection type is required")
    private String type; // CATEGORY, YOUTUBE_SET

    private String status; // DRAFT, PUBLISHED, ARCHIVED
    private List<QuestionDto> questions;
    private int questionCount;
}
