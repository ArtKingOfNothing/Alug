package com.alug.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.br.CPF;
import com.alug.backend.model.Endereco;

public record ClienteRequestDTO(
        @NotBlank(message = "O nome é obrigatorio")
        String nome,

        @NotBlank(message = "O e-mail é obrigatorio")
        @Email(message = "Formato de e-mail invalido")
        String email,

        @NotBlank(message = "O CPF é obrigatorio")
        @CPF(message = "CPF invalido")
        String cpf,

        @NotBlank(message = "O telefone é obrigatorio")
        String telefone,

        Endereco endereco
) {}