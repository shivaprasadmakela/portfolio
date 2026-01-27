package com.portfolio_backend.repository.challenges;

import com.portfolio_backend.entity.challenges.VerificationQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VerificationQuestionRepository extends JpaRepository<VerificationQuestion, Long> {
    List<VerificationQuestion> findAllByIsActiveTrueOrderByIdAsc();
}
