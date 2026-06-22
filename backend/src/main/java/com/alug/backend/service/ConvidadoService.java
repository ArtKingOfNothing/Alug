package com.alug.backend.service;

import com.alug.backend.model.Convidado;
import com.alug.backend.model.Reserva;
import com.alug.backend.repository.ConvidadoRepository;
import com.alug.backend.repository.ReservaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConvidadoService {

    private final ConvidadoRepository convidadoRepository;
    private final ReservaRepository reservaRepository;

    public ConvidadoService(ConvidadoRepository convidadoRepository, ReservaRepository reservaRepository) {
        this.convidadoRepository = convidadoRepository;
        this.reservaRepository = reservaRepository;
    }

    // RF-008
    public Convidado salvarConvidado(Integer idReserva, Convidado convidado) {
        Reserva reserva = reservaRepository.findById(idReserva)
                .orElseThrow(() -> new IllegalArgumentException("Reserva não encontrada"));

        convidado.setReserva(reserva);
        return convidadoRepository.save(convidado);
    }


    public List<Convidado> listarPorReserva(Integer idReserva) {
        return convidadoRepository.findByReserva_IdReserva(idReserva);
    }

    // RF-009
    public void removerConvidado(Integer idConvidado) {
        if (!convidadoRepository.existsById(idConvidado)) {
            throw new IllegalArgumentException("Convidado não encontrado");
        }
        convidadoRepository.deleteById(idConvidado);
    }
}