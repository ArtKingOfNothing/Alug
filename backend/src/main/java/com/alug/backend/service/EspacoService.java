package com.alug.backend.service;

import com.alug.backend.model.Espaco;
import com.alug.backend.repository.EspacoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EspacoService {

    private final EspacoRepository espacoRepository;

    public EspacoService(EspacoRepository espacoRepository) {
        this.espacoRepository = espacoRepository;
    }

    // RF-019
    public Espaco salvarEspaco(Espaco espaco) {

        return espacoRepository.save(espaco);
    }

    public List<Espaco> listarTodos() {
        return espacoRepository.findAll();
    }

    public Espaco consultarPorId(Integer id) {
        return espacoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Espaço inexistente."));
    }

    // RF-020
    public Espaco consultarPorEndereco(String logradouro) {
        return espacoRepository.findByEndereco_LogradouroContainingIgnoreCase(logradouro)
                .orElseThrow(() -> new IllegalArgumentException("Endereço inexistente, verifique se os dados estão corretos."));
    }

    // RF-021
    public Espaco alterarEspaco(Integer id, Espaco dadosAtualizados) {
        Espaco espacoExistente = consultarPorId(id);

        espacoExistente.setCapacidade(dadosAtualizados.getCapacidade());
        espacoExistente.setValor(dadosAtualizados.getValor());

        if (dadosAtualizados.getEndereco() != null) {
            espacoExistente.setEndereco(dadosAtualizados.getEndereco());
        }

        return espacoRepository.save(espacoExistente);
    }

    // RF-022
    public void removerEspaco(Integer id) {
        Espaco espaco = consultarPorId(id);
        // RF-022 "Não é permitido a exclusão de espaço com pendencias de reserva."

        espacoRepository.delete(espaco);
    }
}