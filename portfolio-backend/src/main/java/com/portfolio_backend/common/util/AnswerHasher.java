package com.portfolio_backend.common.util;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;

/**
 * Hashes verification answers for comparison against the stored digest.
 *
 * Note this is deliberately a plain digest, not a password hash: the values are
 * short, low-entropy words drawn from a public question set, so the digest is not
 * a secret and is never exposed by the API. It exists so the plaintext answer is
 * not sitting in the database, nothing more.
 */
public final class AnswerHasher {

    private AnswerHasher() {
    }

    public static String hash(String input) {
        if (input == null) {
            throw new IllegalArgumentException("Answer cannot be null");
        }
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            // Explicit UTF-8: the previous getBytes() used the platform default,
            // so the same answer hashed differently across environments.
            byte[] digest = md.digest(normalise(input).getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(digest);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 is required but unavailable", e);
        }
    }

    private static String normalise(String input) {
        return input.trim().toLowerCase();
    }
}
