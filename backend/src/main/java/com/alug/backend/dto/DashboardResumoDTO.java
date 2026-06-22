package com.alug.backend.dto;

public record DashboardResumoDTO(
        long reservasHoje,
        int ocupacaoMedia,
        int ticketsAbertos,
        long clientesBase,
        long espacosBase,
        long reservasBase
) {
}
