package com.portfolio_backend.common.exception;

public record ApiErrorResponse(
    String code,
    String message
) {}
