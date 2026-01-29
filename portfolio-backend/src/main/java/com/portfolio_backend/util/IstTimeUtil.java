package com.portfolio_backend.util;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;

public class IstTimeUtil {

    private static final ZoneId IST = ZoneId.of("Asia/Kolkata");

    public static LocalDate today() {
        return LocalDate.now(IST);
    }

    public static LocalDate toLocalDate(java.time.Instant instant) {
        if (instant == null) return null;
        return instant.atZone(IST).toLocalDate();
    }

    public static LocalTime timeNow() {
        return LocalTime.now(IST);
    }

    public static boolean inWindow(LocalTime start, LocalTime end) {
        LocalTime now = timeNow();
        return !now.isBefore(start) && now.isBefore(end);
    }
}
