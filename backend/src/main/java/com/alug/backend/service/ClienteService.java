package com.alug.backend.service;

import com.alug.backend.model.Cliente;
import com.alug.backend.repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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

    // RF-006
    public void removerCliente(Integer idCliente) {
        Cliente cliente = clienteRepository.findById(idCliente)
                .orElseThrow(() -> new IllegalArgumentException("Erro: ID não encontrado."));
        clienteRepository.delete(cliente);
    }

    // RF-004
    public Cliente consultarClientePorId(Integer idCliente) {
        return clienteRepository.findById(idCliente)
                .orElseThrow(() -> new IllegalArgumentException("Cliente inexistente."));
    }
    // RF-003
    public List<Cliente> consultarClientePorNome(String nome) {
        List<Cliente> clientes = clienteRepository.findByNomeContainingIgnoreCase(nome);
        if (clientes.isEmpty()) {
            throw new IllegalArgumentException("Cliente inexistente.");
        }
        return clientes;
    }
}