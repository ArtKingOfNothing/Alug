package com.alug.backend.controller;

import com.alug.backend.dto.GerenteRequestDTO;
import com.alug.backend.dto.GerenteResponseDTO;
import com.alug.backend.model.Gerente;
import com.alug.backend.service.GerenteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/gerentes")
@PreAuthorize("hasRole('SUPER_ADMIN')") //só super admin podem fazer algo aqui
public class GerenteController {

    private final GerenteService gerenteService;

    public GerenteController(GerenteService gerenteService) {
        this.gerenteService = gerenteService;
    }

    // RF-011
    @PostMapping
    public ResponseEntity<GerenteResponseDTO> criarGerente(@Valid @RequestBody GerenteRequestDTO dados) {
        Gerente gerente = new Gerente();
        gerente.setNome(dados.nome());
        gerente.setCpf(dados.cpf());
        gerente.setTelefone(dados.telefone());
        gerente.setEmail(dados.email());
        gerente.setSenha(dados.senha());
        gerente.setEndereco(dados.endereco());

        Gerente gerenteSalvo = gerenteService.salvarGerente(gerente);
        return ResponseEntity.status(HttpStatus.CREATED).body(new GerenteResponseDTO(gerenteSalvo));
    }

    @GetMapping
    public ResponseEntity<List<GerenteResponseDTO>> listarTodos() {
        List<Gerente> gerentes = gerenteService.listarTodos();
        List<GerenteResponseDTO> resposta = gerentes.stream()
                .map(GerenteResponseDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(resposta);
    }

    // RF-013
    @GetMapping("/{id}")
    public ResponseEntity<GerenteResponseDTO> consultarPorId(@PathVariable Integer id) {
        Gerente gerente = gerenteService.consultarPorId(id);
        return ResponseEntity.ok(new GerenteResponseDTO(gerente));
    }

    // RF-012
    @GetMapping("/busca")
    public ResponseEntity<List<GerenteResponseDTO>> consultarPorNome(@RequestParam String nome) {
        List<Gerente> gerentes = gerenteService.consultarPorNome(nome);
        List<GerenteResponseDTO> resposta = gerentes.stream()
                .map(GerenteResponseDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(resposta);
    }


    // RF-014
    @PutMapping("/{id}")
    public ResponseEntity<GerenteResponseDTO> alterarGerente(@PathVariable Integer id, @Valid @RequestBody GerenteRequestDTO dados) {
        Gerente novosDados = new Gerente();
        novosDados.setNome(dados.nome());
        novosDados.setCpf(dados.cpf());
        novosDados.setTelefone(dados.telefone());
        novosDados.setEmail(dados.email());
        novosDados.setSenha(dados.senha());
        novosDados.setEndereco(dados.endereco());

        Gerente gerenteAtualizado = gerenteService.alterarGerente(id, novosDados);
        return ResponseEntity.ok(new GerenteResponseDTO(gerenteAtualizado));
    }

    // RF-015
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarGerente(@PathVariable Integer id) {
        gerenteService.removerGerente(id);
        return ResponseEntity.noContent().build();
    }
}