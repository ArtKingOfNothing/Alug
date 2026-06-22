package com.alug.backend.dto;

import com.alug.backend.model.Gerente;

public record GerenteResponseDTO(
        Integer idGerente,
        String nome,
        String cpf,
        String telefone,
        String email
) {
    public GerenteResponseDTO(Gerente gerente) {
        this( //senha não incluida fun fact
                gerente.getIdGerente(),
                gerente.getNome(),
                gerente.getCpf(),
                gerente.getTelefone(),
                gerente.getEmail()
        );
    }
}