package com.alug.backend.controller;

import com.alug.backend.dto.EspacoRequestDTO;
import com.alug.backend.dto.EspacoResponseDTO;
import com.alug.backend.model.Espaco;
import com.alug.backend.service.EspacoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/espacos")
public class EspacoController {

    private final EspacoService espacoService;

    public EspacoController(EspacoService espacoService) {
        this.espacoService = espacoService;
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_GERENTE_COMUM', 'ROLE_SUPER_ADMIN')")
    public ResponseEntity<EspacoResponseDTO> criarEspaco(@Valid @RequestBody EspacoRequestDTO dados) {
        Espaco espaco = new Espaco();
        espaco.setCapacidade(dados.capacidade());
        espaco.setValor(dados.valor());
        espaco.setEndereco(dados.endereco());

        Espaco espacoSalvo = espacoService.salvarEspaco(espaco);
        return ResponseEntity.status(HttpStatus.CREATED).body(new EspacoResponseDTO(espacoSalvo));
    }

    @GetMapping
    public ResponseEntity<List<EspacoResponseDTO>> listarTodos() {
        List<Espaco> espacos = espacoService.listarTodos();
        List<EspacoResponseDTO> resposta = espacos.stream()
                .map(EspacoResponseDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(resposta);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EspacoResponseDTO> consultarPorId(@PathVariable Integer id) {
        Espaco espaco = espacoService.consultarPorId(id);
        return ResponseEntity.ok(new EspacoResponseDTO(espaco));
    }

    @GetMapping("/busca")
    public ResponseEntity<EspacoResponseDTO> consultarPorEndereco(@RequestParam String logradouro) {
        Espaco espaco = espacoService.consultarPorEndereco(logradouro);
        return ResponseEntity.ok(new EspacoResponseDTO(espaco));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_GERENTE_COMUM', 'ROLE_SUPER_ADMIN')")
    public ResponseEntity<EspacoResponseDTO> alterarEspaco(@PathVariable Integer id, @Valid @RequestBody EspacoRequestDTO dados) {
        Espaco novosDados = new Espaco();
        novosDados.setCapacidade(dados.capacidade());
        novosDados.setValor(dados.valor());
        novosDados.setEndereco(dados.endereco());

        Espaco espacoAtualizado = espacoService.alterarEspaco(id, novosDados);
        return ResponseEntity.ok(new EspacoResponseDTO(espacoAtualizado));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_GERENTE_COMUM', 'ROLE_SUPER_ADMIN')")
    public ResponseEntity<Void> deletarEspaco(@PathVariable Integer id) {
        espacoService.removerEspaco(id);
        return ResponseEntity.noContent().build();
    }
}