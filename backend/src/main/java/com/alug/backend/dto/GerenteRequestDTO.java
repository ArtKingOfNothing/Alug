package com.alug.backend.dto;

import com.alug.backend.model.Endereco;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record GerenteRequestDTO(

        @NotBlank(message = "O nome é obrigatorio")
        String nome,

        @NotBlank(message = "O CPF é obrigatorio")
        @Size(min = 11, max = 11, message = "O CPF deve ter 11 caracteres")
        String cpf,

        @NotBlank(message = "O telefone é obrigatorio")
        String telefone,

        @NotBlank(message = "O e-mail é obrigatorio")
        @Email(message = "Formato de e-mail invalido")
        String email,

        @NotBlank(message = "A senha é obrigatoria")
        String senha,

        Endereco endereco
) {}