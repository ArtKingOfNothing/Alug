package com.alug.backend.service;

import com.alug.backend.repository.GerenteRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AutorizacaoService implements UserDetailsService {

    private final GerenteRepository repository;

    public AutorizacaoService(GerenteRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        var gerente = repository.findByEmail(email);
        if (gerente == null) {
            throw new UsernameNotFoundException("Usuário não encontrado");
        }
        return gerente;
    }
}