package com.alug.backend.service;

import com.alug.backend.model.Cliente;
import com.alug.backend.repository.ClienteRepository;
import org.springframework.stereotype.Service;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    // RF-002
    public Cliente salvarCliente(Cliente cliente) {

        if (clienteRepository.findByCpf(cliente.getCpf()).isPresent()) {
            throw new IllegalArgumentException("Erro: Já existe um cliente com este CPF no sistema");
        }

        if (clienteRepository.findByEmail(cliente.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Erro: Já existe um cliente com este e-mail no sistema");
        }
        return clienteRepository.save(cliente);
    }
}