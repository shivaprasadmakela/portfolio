package com.portfolio_backend.util;

import java.security.MessageDigest;
import java.util.HexFormat;

public class AnswerHasher {

    public static String hash(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            return HexFormat.of().formatHex(
                md.digest(input.trim().toLowerCase().getBytes())
            );
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
