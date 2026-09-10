package com.portfolio_backend.checkin.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfolio_backend.checkin.dto.VerificationQuestionDto;
import com.portfolio_backend.checkin.entity.VerificationQuestion;
import com.portfolio_backend.user.entity.User;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Regression guard for the answer-hash disclosure: GET /api/challenges/question
 * used to serialise the entity, which exposed answerHash to every caller.
 */
class CheckInResponseContractTest {

    private final ObjectMapper mapper = new ObjectMapper();

    @Test
    void questionDtoNeverCarriesTheAnswerHash() throws Exception {
        String json = mapper.writeValueAsString(
            new VerificationQuestionDto(106L, "Type 'good habits' without spaces", "g...")
        );

        assertFalse(json.contains("answerHash"), "DTO must not expose answerHash: " + json);
        assertFalse(json.contains("094c7771"), "DTO must not expose the digest: " + json);
        assertTrue(json.contains("\"question\""));
        assertTrue(json.contains("\"placeholder\""));
    }

    @Test
    void theEntityStillHoldsTheHashItJustMustNotBeReturned() {
        VerificationQuestion entity = new VerificationQuestion()
            .setQuestion("q")
            .setAnswerHash("deadbeef");
        // The field is required for verification; the DTO boundary is what protects it.
        assertTrue("deadbeef".equals(entity.getAnswerHash()));
    }

    @Test
    void userNeverSerialisesItsPasswordHash() throws Exception {
        User user = new User().setEmail("a@b.com").setName("A").setPasswordHash("super-secret");
        String json = mapper.writeValueAsString(user);

        assertFalse(json.contains("passwordHash"), json);
        assertFalse(json.contains("super-secret"), json);
    }
}
