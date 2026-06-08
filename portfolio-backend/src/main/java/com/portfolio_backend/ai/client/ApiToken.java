package com.portfolio_backend.ai.client;

public class ApiToken {
    private final String key;
    private volatile long blockedUntil = 0L;

    public ApiToken(String key) {
        this.key = key;
    }

    public String getKey() {
        return this.key;
    }

    public boolean isAvailable() {
        return System.currentTimeMillis() >= blockedUntil;
    }

    public void blockFor(long durationMs) {
        this.blockedUntil = System.currentTimeMillis() + durationMs;
    }
}
