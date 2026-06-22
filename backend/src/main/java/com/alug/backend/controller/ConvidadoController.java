package com.alug.backend.controller;

import com.alug.backend.dto.ConvidadoRequestDTO;
import com.alug.backend.dto.ConvidadoResponseDTO;
import com.alug.backend.model.Convidado;
import com.alug.backend.service.ConvidadoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/reservas/{idReserva}/convidados")
public class ConvidadoController {

    private final ConvidadoService convidadoService;

    public ConvidadoController(ConvidadoService convidadoService) {
        this.convidadoService = convidadoService;
    }

    // RF-008: Adicionar Convidado (Restrito a administradores/gerentes)
    @PostMapping
    @PreAuthorize("hasRole('SUPER_ADMIN') or hasRole('GERENTE_COMUM')")
    public ResponseEntity<ConvidadoResponseDTO> adicionarConvidado(
            @PathVariable Integer idReserva,
            @Valid @RequestBody ConvidadoRequestDTO dados) {

        Convidado convidado = new Convidado();
        convidado.setNome(dados.nome());
        convidado.setTelefone(dados.telefone());

        Convidado convidadoSalvo = convidadoService.salvarConvidado(idReserva, convidado);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ConvidadoResponseDTO(convidadoSalvo));
    }

    // qualquer um com o ID da reserva pode ver seus convidados
    @GetMapping
    public ResponseEntity<List<ConvidadoResponseDTO>> listarPorReserva(@PathVariable Integer idReserva) {
        List<Convidado> convidados = convidadoService.listarPorReserva(idReserva);

        List<ConvidadoResponseDTO> resposta = convidados.stream()
                .map(ConvidadoResponseDTO::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(resposta);
    }

    // RF-009: Remover Convidado (Restrito a administradores/gerentes)
    @DeleteMapping("/{idConvidado}")
    @PreAuthorize("hasRole('SUPER_ADMIN') or hasRole('GERENTE_COMUM')")
    public ResponseEntity<Void> removerConvidado(@PathVariable Integer idReserva, @PathVariable Integer idConvidado) {
        convidadoService.removerConvidado(idConvidado);
        return ResponseEntity.noContent().build();
    }
}