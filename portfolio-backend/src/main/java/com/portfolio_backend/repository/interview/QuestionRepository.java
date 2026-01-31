package com.portfolio_backend.repository.interview;

import com.portfolio_backend.entity.interview.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
}
