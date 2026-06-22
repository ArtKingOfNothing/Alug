package com.alug.backend.dto;

public record TokenResponseDTO(
        String token,
        String tipo,
        Long tempoExpiracao
) {
    public TokenResponseDTO(String token) {
        this(token, "Bearer", 86400L);
    }
}