package com.alug.backend.dto;

import com.alug.backend.model.Endereco;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record EspacoRequestDTO(

        @NotNull(message = "A capacidade é obrigatoria")
        @Min(value = 1, message = "A capacidade deve ser de pelo menos 1 pessoa")
        Integer capacidade,

        @NotNull(message = "O valor é obrigatoria")
        @Min(value = 0, message = "O valor não pode ser negativo")
        Float valor,

        @NotNull(message = "O endereço é obrigatoria")
        Endereco endereco
) {}