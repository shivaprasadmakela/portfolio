package com.portfolio_backend.entity.challenges;

import com.portfolio_backend.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.Accessors;

@Entity
@Table(name = "verification_questions")
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Accessors(chain = true)
public class VerificationQuestion extends BaseEntity<VerificationQuestion> {

    private String question;

    private String answerHash;

    private String placeholder;

    private int difficulty;
}
