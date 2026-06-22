package com.alug.backend.dto;

import com.alug.backend.model.Endereco;
import com.alug.backend.model.Espaco;

public record EspacoResponseDTO(
        Integer idEspaco,
        Integer capacidade,
        Float valor,
        Endereco endereco
) {
    public EspacoResponseDTO(Espaco espaco) {
        this(
                espaco.getIdEspaco(),
                espaco.getCapacidade(),
                espaco.getValor(),
                espaco.getEndereco()
        );
    }
}