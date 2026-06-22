package com.alug.backend.dto;

public record LoginResponseDTO(
        String token,
        String nome,
        String email,
        String perfil
) {
}
