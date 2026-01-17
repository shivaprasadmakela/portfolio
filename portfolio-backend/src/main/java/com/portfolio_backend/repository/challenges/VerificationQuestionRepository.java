package com.portfolio_backend.repository.challenges;

import com.portfolio_backend.entity.challenges.VerificationQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.Optional;
import java.util.UUID;

public interface VerificationQuestionRepository extends JpaRepository<VerificationQuestion, UUID> {

    @Query(value = "SELECT * FROM verification_questions ORDER BY RAND() LIMIT 1", nativeQuery = true)
    Optional<VerificationQuestion> findRandomQuestion();
}
