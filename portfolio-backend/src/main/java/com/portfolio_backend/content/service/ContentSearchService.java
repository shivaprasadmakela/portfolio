package com.portfolio_backend.content.service;

import com.portfolio_backend.content.dto.QuestionDto;
import com.portfolio_backend.content.entity.Question;
import com.portfolio_backend.content.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContentSearchService {

    private final QuestionRepository questionRepository;
    private final ContentMapper contentMapper;

    public List<QuestionDto> searchQuestions(String query) {
        return questionRepository
                .findByTitleContainingIgnoreCaseOrSummaryContainingIgnoreCaseOrContentHtmlContainingIgnoreCase(
                        query, query, query
                )
                .stream()
                .filter(q -> q.getStatus() == Question.Status.PUBLISHED)
                .map(contentMapper::convertToQuestionDto)
                .collect(Collectors.toList());
    }
}
