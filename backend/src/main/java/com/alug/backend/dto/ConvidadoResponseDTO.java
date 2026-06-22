package com.alug.backend.dto;

import com.alug.backend.model.Convidado;

public record ConvidadoResponseDTO(
        Integer idConvidado,
        String nome,
        String telefone,
        Integer idReserva
) {
    public ConvidadoResponseDTO(Convidado convidado) {
        this(
                convidado.getIdConvidado(),
                convidado.getNome(),
                convidado.getTelefone(),
                convidado.getReserva().getIdReserva()
        );
    }
}