package com.portfolio_backend.content.service;

import com.portfolio_backend.content.dto.CollectionDto;
import com.portfolio_backend.content.dto.QuestionDto;
import com.portfolio_backend.content.entity.Collection;
import com.portfolio_backend.content.entity.Question;
import com.portfolio_backend.content.entity.Tag;
import com.portfolio_backend.content.repository.CollectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ContentMapper {

    private final CollectionRepository collectionRepository;

    public CollectionDto convertToMiniDto(Collection collection) {
        CollectionDto dto = new CollectionDto();
        dto.setId(collection.getId());
        dto.setName(collection.getName());
        dto.setSlug(collection.getSlug());
        dto.setDescription(collection.getDescription());
        dto.setIcon(collection.getIcon());
        dto.setThumbnailUrl(collection.getThumbnailUrl());
        dto.setType(collection.getType().getName());
        dto.setStatus(collection.getStatus().name());
        dto.setQuestionCount(collection.getQuestions().size());
        return dto;
    }

    public CollectionDto convertToFullDto(Collection collection) {
        CollectionDto dto = convertToMiniDto(collection);
        dto.setVideoId(collection.getVideoId());
        dto.setPublishDate(collection.getPublishDate());
        dto.setQuestions(collection.getQuestions().stream()
                .map(this::convertToQuestionDto)
                .collect(Collectors.toList()));
        return dto;
    }

    public QuestionDto convertToQuestionDto(Question q) {
        QuestionDto dto = new QuestionDto();
        dto.setId(q.getId());
        dto.setTitle(q.getTitle());
        dto.setSlug(q.getSlug());
        dto.setSummary(q.getSummary());
        dto.setContentHtml(q.getContentHtml());
        dto.setSolutionMd(q.getSolutionMd());
        dto.setDifficulty(q.getDifficulty().name());
        dto.setStatus(q.getStatus().name());
        dto.setViews(q.getViews());
        dto.setTags(q.getTags().stream().map(Tag::getName).collect(Collectors.toList()));
        dto.setCreatedBy(q.getCreatedBy() != null ? q.getCreatedBy().getId() : null);

        // Find collections this question belongs to
        List<Collection> collections = collectionRepository.findAllByQuestionsId(q.getId());
        dto.setCollectionIds(collections.stream().map(Collection::getId).collect(Collectors.toList()));

        return dto;
    }
}
