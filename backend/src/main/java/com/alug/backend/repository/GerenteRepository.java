package com.alug.backend.repository;

import com.alug.backend.model.Gerente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GerenteRepository extends JpaRepository<Gerente, Integer> {

    // RF-012
    List<Gerente> findByNomeContainingIgnoreCase(String nome);

    // RF-001
    Optional<Gerente> findByEmailAndSenha(String email, String senha);

    Optional<Gerente> findByEmail(String email);

    Optional<Gerente> findByCpf(String cpf);
}