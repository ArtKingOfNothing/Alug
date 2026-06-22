package com.alug.backend.dto;

import com.alug.backend.model.Cliente;

public record ClienteResponseDTO(
        Integer idCliente,
        String nome,
        String email,
        String telefone
) {
    public ClienteResponseDTO(Cliente cliente) {
        this(cliente.getIdCliente(), cliente.getNome(), cliente.getEmail(), cliente.getTelefone());
    }
}