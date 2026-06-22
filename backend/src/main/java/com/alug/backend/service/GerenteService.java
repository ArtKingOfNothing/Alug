package com.alug.backend.service;

import com.alug.backend.model.Gerente;
import com.alug.backend.repository.GerenteRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GerenteService {

    private final GerenteRepository gerenteRepository;
    private final PasswordEncoder codificadorDeSenha;
    public GerenteService(GerenteRepository gerenteRepository, PasswordEncoder codificadorDeSenha) {
        this.gerenteRepository = gerenteRepository;
        this.codificadorDeSenha = codificadorDeSenha;
    }

    // RF-011
    public Gerente salvarGerente(Gerente gerente) {
        if (gerenteRepository.findByCpf(gerente.getCpf()).isPresent()) {
            throw new IllegalArgumentException("Erro: Já existe um gerente com este CPF no sistema.");
        }

        if (gerenteRepository.findByEmail(gerente.getEmail()) != null) {
            throw new IllegalArgumentException("Erro: Já existe um gerente com este e-mail no sistema.");
        }
        gerente.setSenha(codificadorDeSenha.encode(gerente.getSenha())); // criptografa

        return gerenteRepository.save(gerente);
    }

    // RF-013
    public Gerente consultarPorId(Integer id) {
        return gerenteRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Gerente não existe."));
    }

    // RF-012
    public List<Gerente> consultarPorNome(String nome) {
        List<Gerente> gerentes = gerenteRepository.findByNomeContainingIgnoreCase(nome);
        if (gerentes.isEmpty()) {
            throw new IllegalArgumentException("Gerente não existe");
        }
        return gerentes;
    }

    public List<Gerente> listarTodos() {
        return gerenteRepository.findAll();
    }

    // RF-014
    public Gerente alterarGerente(Integer id, Gerente dadosAtualizados) {
        Gerente gerenteExistente = consultarPorId(id);

        gerenteRepository.findByCpf(dadosAtualizados.getCpf()).ifPresent(g -> {
            if (!g.getIdGerente().equals(id)) {
                throw new IllegalArgumentException("Erro: CPF já está em uso");
            }
        });

        Gerente gerentePorEmail = gerenteRepository.findByEmail(dadosAtualizados.getEmail());
        if (gerentePorEmail != null && !gerentePorEmail.getIdGerente().equals(id)) {
            throw new IllegalArgumentException("Erro: E-mail já está em uso");
        }

        gerenteExistente.setNome(dadosAtualizados.getNome());
        gerenteExistente.setCpf(dadosAtualizados.getCpf());
        gerenteExistente.setEmail(dadosAtualizados.getEmail());
        gerenteExistente.setTelefone(dadosAtualizados.getTelefone());

        if (dadosAtualizados.getSenha() != null && !dadosAtualizados.getSenha().isBlank()) {
            gerenteExistente.setSenha(codificadorDeSenha.encode(dadosAtualizados.getSenha()));
        }

        return gerenteRepository.save(gerenteExistente);
    }

    // RF-015
    public void removerGerente(Integer id) {
        Gerente gerente = consultarPorId(id);
        gerenteRepository.delete(gerente);
    }
}