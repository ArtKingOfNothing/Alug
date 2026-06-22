package com.alug.backend.controller;

import com.alug.backend.dto.ClienteRequestDTO;
import com.alug.backend.dto.ClienteResponseDTO;
import com.alug.backend.model.Cliente;
import com.alug.backend.service.ClienteService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping
    public List<ClienteResponseDTO> listar(@RequestParam(required = false) String nome) {
        List<Cliente> clientes;

        if (nome == null || nome.isBlank()) {
            clientes = clienteService.listarClientes();
        } else {
            clientes = clienteService.consultarClientePorNome(nome);
        }

        return clientes.stream().map(ClienteResponseDTO::new).toList();
    }

    @GetMapping("/{id}")
    public ClienteResponseDTO buscarPorId(@PathVariable Integer id) {
        return new ClienteResponseDTO(clienteService.consultarClientePorId(id));
    }

    @PostMapping
    public ResponseEntity<ClienteResponseDTO> criar(@Valid @RequestBody ClienteRequestDTO body) {
        Cliente novo = toEntity(body);
        Cliente salvo = clienteService.salvarCliente(novo);

        return ResponseEntity
                .created(URI.create("/api/clientes/" + salvo.getIdCliente()))
                .body(new ClienteResponseDTO(salvo));
    }

    @PutMapping("/{id}")
    public ClienteResponseDTO atualizar(@PathVariable Integer id, @Valid @RequestBody ClienteRequestDTO body) {
        Cliente atualizado = clienteService.alterarCliente(id, toEntity(body));
        return new ClienteResponseDTO(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        clienteService.removerCliente(id);
        return ResponseEntity.noContent().build();
    }

    private Cliente toEntity(ClienteRequestDTO dto) {
        Cliente cliente = new Cliente();
        cliente.setNome(dto.nome());
        cliente.setEmail(dto.email());
        cliente.setCpf(dto.cpf());
        cliente.setTelefone(dto.telefone());
        cliente.setEndereco(dto.endereco());
        return cliente;
    }
}
