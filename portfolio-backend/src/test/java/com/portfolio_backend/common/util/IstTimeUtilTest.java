package com.portfolio_backend.common.util;

import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

class IstTimeUtilTest {

    @Test
    void convertsAnInstantToTheIstCalendarDay() {
        // 22:00 UTC is already the next day in IST (UTC+05:30).
        Instant lateUtc = Instant.parse("2026-03-14T22:00:00Z");
        assertEquals(LocalDate.of(2026, 3, 15), IstTimeUtil.toLocalDate(lateUtc));
    }

    @Test
    void treatsEarlyUtcAsTheSameIstDay() {
        Instant earlyUtc = Instant.parse("2026-03-14T02:00:00Z");
        assertEquals(LocalDate.of(2026, 3, 14), IstTimeUtil.toLocalDate(earlyUtc));
    }

    @Test
    void returnsNullForAMissingInstant() {
        assertNull(IstTimeUtil.toLocalDate(null));
    }

    @Test
    void windowIsHalfOpenAndSpansTheGivenRange() {
        // inWindow() reads the clock, so assert the invariant it must satisfy:
        // a full-day window always contains "now", an empty one never does.
        assertTrue(IstTimeUtil.inWindow(LocalTime.MIN, LocalTime.MAX));
        assertTrue(!IstTimeUtil.inWindow(LocalTime.NOON, LocalTime.NOON));
    }
}
