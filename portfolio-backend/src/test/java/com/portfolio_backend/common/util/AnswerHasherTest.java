package com.portfolio_backend.common.util;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class AnswerHasherTest {

    /**
     * Pins the digest against a value seeded by V2__insert_questions.sql. If the
     * normalisation or charset ever changes, every stored answer_hash silently stops
     * matching -- this catches that instead of users seeing "Incorrect answer".
     */
    @Test
    void matchesTheSeededHashForAKnownAnswer() {
        assertEquals(
            "094c7771ac81a6bff054f85369fdbd7660868963be0f38656aa99a4b46619d0e",
            AnswerHasher.hash("goodhabits")
        );
    }

    @Test
    void normalisesCaseAndSurroundingWhitespace() {
        String expected = AnswerHasher.hash("goodhabits");
        assertEquals(expected, AnswerHasher.hash("  GoodHabits  "));
        assertEquals(expected, AnswerHasher.hash("GOODHABITS"));
    }

    @Test
    void hashesNonAsciiConsistently() {
        // Guards the explicit UTF-8: the previous implementation used the platform
        // default charset, so this differed between environments.
        assertEquals(
            AnswerHasher.hash("café"),
            AnswerHasher.hash("CAFÉ")
        );
    }

    @Test
    void rejectsNull() {
        assertThrows(IllegalArgumentException.class, () -> AnswerHasher.hash(null));
    }
}
