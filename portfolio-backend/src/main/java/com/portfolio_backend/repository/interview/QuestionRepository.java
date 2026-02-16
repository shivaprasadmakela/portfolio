package com.portfolio_backend.repository.interview;

import com.portfolio_backend.entity.interview.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    
    Optional<Question> findBySlug(String slug);
    
    List<Question> findByStatus(Question.Status status);
    
    List<Question> findByStatusAndDifficulty(Question.Status status, Question.Difficulty difficulty);
    
    List<Question> findByTitleContainingIgnoreCaseOrSummaryContainingIgnoreCaseOrContentHtmlContainingIgnoreCase(
        String title, String summary, String content
    );
}
