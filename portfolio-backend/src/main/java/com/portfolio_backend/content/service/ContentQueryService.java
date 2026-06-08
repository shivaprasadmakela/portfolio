package com.portfolio_backend.content.service;

import com.portfolio_backend.content.dto.CollectionDto;
import com.portfolio_backend.content.dto.QuestionDto;
import com.portfolio_backend.content.entity.Collection;
import com.portfolio_backend.content.entity.Question;
import com.portfolio_backend.content.repository.CollectionRepository;
import com.portfolio_backend.content.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContentQueryService {

    private final CollectionRepository collectionRepository;
    private final QuestionRepository questionRepository;
    private final ContentMapper contentMapper;

    public List<CollectionDto> getAllCategories() {
        return collectionRepository.findAllByTypeNameAndStatus("CATEGORY", Collection.Status.PUBLISHED)
                .stream().map(contentMapper::convertToMiniDto).collect(Collectors.toList());
    }

    public List<CollectionDto> getAllSets() {
        return collectionRepository.findAllByTypeNameAndStatus("YOUTUBE_SET", Collection.Status.PUBLISHED)
                .stream().map(contentMapper::convertToMiniDto).collect(Collectors.toList());
    }

    public CollectionDto getCollection(Long id) {
        return collectionRepository.findById(id)
                .map(contentMapper::convertToFullDto)
                .orElseThrow(() -> new RuntimeException("Collection not found"));
    }

    public CollectionDto getCollectionBySlug(String slug) {
        return collectionRepository.findBySlug(slug)
                .map(contentMapper::convertToFullDto)
                .orElseThrow(() -> new RuntimeException("Collection not found with slug: " + slug));
    }

    @Transactional
    public QuestionDto getQuestionBySlug(String slug) {
        Question question = questionRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Question not found with slug: " + slug));

        // Count view
        questionRepository.save(question);

        return contentMapper.convertToQuestionDto(question);
    }

    public List<QuestionDto> getAllQuestions() {
        return questionRepository.findAll()
                .stream().map(contentMapper::convertToQuestionDto).collect(Collectors.toList());
    }
}
