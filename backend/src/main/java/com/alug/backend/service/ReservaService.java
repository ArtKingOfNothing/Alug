package com.alug.backend.service;

import com.alug.backend.model.*;
import com.alug.backend.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservaService {

    private final ReservaRepository reservaRepository;
    private final ClienteRepository clienteRepository;
    private final GerenteRepository gerenteRepository;
    private final EspacoRepository espacoRepository;

    public ReservaService(ReservaRepository reservaRepository,
                          ClienteRepository clienteRepository,
                          GerenteRepository gerenteRepository,
                          EspacoRepository espacoRepository) {
        this.reservaRepository = reservaRepository;
        this.clienteRepository = clienteRepository;
        this.gerenteRepository = gerenteRepository;
        this.espacoRepository = espacoRepository;
    }

    // RF-007: Criar reserva verificando disponibilidade de espaço na data
    public Reserva criarReserva(Reserva reserva, Integer idCliente, Integer idGerente, Integer idEspaco) {
        Cliente cliente = clienteRepository.findById(idCliente)
                .orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado com ID: " + idCliente));

        Gerente gerente = gerenteRepository.findById(idGerente)
                .orElseThrow(() -> new IllegalArgumentException("Gerente não encontrado com ID: " + idGerente));

        Espaco espaco = espacoRepository.findById(idEspaco)
                .orElseThrow(() -> new IllegalArgumentException("Espaço não encontrado com ID: " + idEspaco));

        if (reservaRepository.existsByEspacoIdEspacoAndDataEvento(idEspaco, reserva.getDataEvento())) {
            throw new IllegalArgumentException("Espaço já reservado para esta data.");
        }

        reserva.setCliente(cliente);
        reserva.setGerente(gerente);
        reserva.setEspaco(espaco);

        return reservaRepository.save(reserva);
    }

    public List<Reserva> listarTodas() {
        return reservaRepository.findAll();
    }

    public Reserva consultarPorId(Integer id) {
        return reservaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Reserva não encontrada com ID: " + id));
    }

    public Reserva alterarReserva(Integer id, Reserva dadosNovos, Integer idCliente, Integer idGerente, Integer idEspaco) {
        Reserva reservaExistente = consultarPorId(id);

        Cliente cliente = clienteRepository.findById(idCliente)
                .orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado com ID: " + idCliente));
        Gerente gerente = gerenteRepository.findById(idGerente)
                .orElseThrow(() -> new IllegalArgumentException("Gerente não encontrado com ID: " + idGerente));
        Espaco espaco = espacoRepository.findById(idEspaco)
                .orElseThrow(() -> new IllegalArgumentException("Espaço não encontrado com ID: " + idEspaco));

        boolean mudouEspaco = !reservaExistente.getEspaco().getIdEspaco().equals(idEspaco);
        boolean mudouData = !reservaExistente.getDataEvento().equals(dadosNovos.getDataEvento());

        if ((mudouEspaco || mudouData) &&
                reservaRepository.existsByEspacoIdEspacoAndDataEvento(idEspaco, dadosNovos.getDataEvento())) {
            throw new IllegalArgumentException("Espaço já reservado para esta data.");
        }

        reservaExistente.setDataEvento(dadosNovos.getDataEvento());
        reservaExistente.setQuantidadeConvidados(dadosNovos.getQuantidadeConvidados());
        reservaExistente.setValorTotal(dadosNovos.getValorTotal());
        reservaExistente.setCliente(cliente);
        reservaExistente.setGerente(gerente);
        reservaExistente.setEspaco(espaco);

        return reservaRepository.save(reservaExistente);
    }

    public void removerReserva(Integer id) {
        Reserva reserva = consultarPorId(id);
        reservaRepository.delete(reserva);
    }
}
