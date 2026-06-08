package com.portfolio_backend.checkin.repository;

import com.portfolio_backend.checkin.entity.VerificationQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VerificationQuestionRepository extends JpaRepository<VerificationQuestion, Long> {
    List<VerificationQuestion> findAllByIsActiveTrueOrderByIdAsc();
}
