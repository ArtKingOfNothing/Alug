package com.alug.backend.controller;

import com.alug.backend.dto.ClienteRequestDTO;
import com.alug.backend.dto.ClienteResponseDTO;
import com.alug.backend.model.Cliente;
import com.alug.backend.service.ClienteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/clientes")
@PreAuthorize("hasAnyAuthority('ROLE_GERENTE_COMUM', 'ROLE_SUPER_ADMIN')")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @PostMapping
    public ResponseEntity<ClienteResponseDTO> criarCliente(@Valid @RequestBody ClienteRequestDTO dados) {
        Cliente cliente = new Cliente();
        cliente.setNome(dados.nome());
        cliente.setEmail(dados.email());
        cliente.setCpf(dados.cpf());
        cliente.setTelefone(dados.telefone());
        cliente.setEndereco(dados.endereco());

        Cliente clienteSalvo = clienteService.salvarCliente(cliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ClienteResponseDTO(clienteSalvo));
    }

    @GetMapping
    public ResponseEntity<List<ClienteResponseDTO>> listarTodos() {
        List<Cliente> clientes = clienteService.listarTodos();

        List<ClienteResponseDTO> resposta = clientes.stream()
                .map(ClienteResponseDTO::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(resposta);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteResponseDTO> consultarPorId(@PathVariable Integer id) {
        Cliente cliente = clienteService.consultarClientePorId(id);
        return ResponseEntity.ok(new ClienteResponseDTO(cliente));
    }

    @GetMapping("/busca")
    public ResponseEntity<List<ClienteResponseDTO>> consultarPorNome(@RequestParam String nome) {
        List<Cliente> clientes = clienteService.consultarClientePorNome(nome);

        List<ClienteResponseDTO> resposta = clientes.stream()
                .map(ClienteResponseDTO::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(resposta);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClienteResponseDTO> alterarCliente(@PathVariable Integer id, @Valid @RequestBody ClienteRequestDTO dados) {
        Cliente novosDados = new Cliente();
        novosDados.setNome(dados.nome());
        novosDados.setEmail(dados.email());
        novosDados.setCpf(dados.cpf());
        novosDados.setTelefone(dados.telefone());
        novosDados.setEndereco(dados.endereco());

        Cliente clienteAtualizado = clienteService.alterarCliente(id, novosDados);
        return ResponseEntity.ok(new ClienteResponseDTO(clienteAtualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarCliente(@PathVariable Integer id) {
        clienteService.removerCliente(id);
        return ResponseEntity.noContent().build();
    }
}