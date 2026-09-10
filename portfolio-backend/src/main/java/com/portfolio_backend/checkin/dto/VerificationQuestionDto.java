package com.portfolio_backend.checkin.dto;

/**
 * Public projection of a verification question.
 *
 * Deliberately narrow: the entity also carries {@code answerHash}, and serialising
 * the entity directly leaked it to every caller. The hash is an unsalted digest of a
 * short, guessable answer, so disclosing it defeats the check entirely.
 */
public record VerificationQuestionDto(
    Long id,
    String question,
    String placeholder
) {}
