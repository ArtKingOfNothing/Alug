package com.alug.backend.controller;

import com.alug.backend.dto.ReservaRequestDTO;
import com.alug.backend.dto.ReservaResponseDTO;
import com.alug.backend.model.Reserva;
import com.alug.backend.service.ReservaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/reservas")
@PreAuthorize("hasAnyAuthority('ROLE_GERENTE_COMUM', 'ROLE_SUPER_ADMIN')")
public class ReservaController {

    private final ReservaService reservaService;

    public ReservaController(ReservaService reservaService) {
        this.reservaService = reservaService;
    }

    @PostMapping
    public ResponseEntity<ReservaResponseDTO> criarReserva(@Valid @RequestBody ReservaRequestDTO dados) {
        Reserva reserva = new Reserva();
        reserva.setDataEvento(dados.dataEvento());
        reserva.setQuantidadeConvidados(dados.quantidadeConvidados());
        reserva.setValorTotal(dados.valorTotal());

        Reserva salva = reservaService.criarReserva(reserva, dados.idCliente(), dados.idGerente(), dados.idEspaco());
        return ResponseEntity.status(HttpStatus.CREATED).body(new ReservaResponseDTO(salva));
    }

    @GetMapping
    public ResponseEntity<List<ReservaResponseDTO>> listarTodas() {
        List<Reserva> reservas = reservaService.listarTodas();
        List<ReservaResponseDTO> resposta = reservas.stream()
                .map(ReservaResponseDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(resposta);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservaResponseDTO> consultarPorId(@PathVariable Integer id) {
        Reserva reserva = reservaService.consultarPorId(id);
        return ResponseEntity.ok(new ReservaResponseDTO(reserva));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReservaResponseDTO> alterarReserva(
            @PathVariable Integer id,
            @Valid @RequestBody ReservaRequestDTO dados) {

        Reserva novosDados = new Reserva();
        novosDados.setDataEvento(dados.dataEvento());
        novosDados.setQuantidadeConvidados(dados.quantidadeConvidados());
        novosDados.setValorTotal(dados.valorTotal());

        Reserva atualizada = reservaService.alterarReserva(
                id, novosDados, dados.idCliente(), dados.idGerente(), dados.idEspaco());
        return ResponseEntity.ok(new ReservaResponseDTO(atualizada));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarReserva(@PathVariable Integer id) {
        reservaService.removerReserva(id);
        return ResponseEntity.noContent().build();
    }
}
