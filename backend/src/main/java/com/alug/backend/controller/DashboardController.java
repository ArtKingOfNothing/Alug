package com.alug.backend.controller;

import com.alug.backend.dto.DashboardResumoDTO;
import com.alug.backend.repository.ClienteRepository;
import com.alug.backend.repository.EspacoRepository;
import com.alug.backend.repository.ReservaRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final ClienteRepository clienteRepository;
    private final EspacoRepository espacoRepository;
    private final ReservaRepository reservaRepository;

    public DashboardController(
            ClienteRepository clienteRepository,
            EspacoRepository espacoRepository,
            ReservaRepository reservaRepository
    ) {
        this.clienteRepository = clienteRepository;
        this.espacoRepository = espacoRepository;
        this.reservaRepository = reservaRepository;
    }

    @GetMapping("/resumo")
    public DashboardResumoDTO resumo() {
        long totalReservas = reservaRepository.count();
        long totalClientes = clienteRepository.count();
        long totalEspacos = espacoRepository.count();

        int ocupacaoMedia = totalEspacos > 0
                ? (int) Math.min(100L, (totalReservas * 100L) / totalEspacos)
                : 0;

        return new DashboardResumoDTO(
                totalReservas,
                ocupacaoMedia,
                0,
                totalClientes,
                totalEspacos,
                totalReservas
        );
    }
}
