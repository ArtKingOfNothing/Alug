package com.alug.backend.dto;

import com.alug.backend.model.Reserva;
import java.time.LocalDate;

public record ReservaResponseDTO(
        Integer idReserva,
        LocalDate dataEvento,
        Integer quantidadeConvidados,
        Float valorTotal,
        Integer idCliente,
        String nomeCliente,
        Integer idGerente,
        String nomeGerente,
        Integer idEspaco
) {
    public ReservaResponseDTO(Reserva reserva) {
        this(
                reserva.getIdReserva(),
                reserva.getDataEvento(),
                reserva.getQuantidadeConvidados(),
                reserva.getValorTotal(),
                reserva.getCliente().getIdCliente(),
                reserva.getCliente().getNome(),
                reserva.getGerente().getIdGerente(),
                reserva.getGerente().getNome(),
                reserva.getEspaco().getIdEspaco()
        );
    }
}
