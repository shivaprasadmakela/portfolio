package com.portfolio_backend.entity.challenges;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import java.util.UUID;

@Entity
@Table(name = "verification_questions")
@Data
public class VerificationQuestion {

    @Id
    private UUID id;

    private String prompt;

    private String correctAnswerHash;

    private Integer difficulty;

    private Boolean active;
}
