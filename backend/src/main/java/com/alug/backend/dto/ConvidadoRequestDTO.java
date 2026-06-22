package com.alug.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ConvidadoRequestDTO(

        @NotBlank(message = "O nome é obrigatorio")
        String nome,

        @NotBlank(message = "O telefone é obrigatorio")
        @Size(min = 10, max = 12, message = "Telefone invalido")
        String telefone
) {}