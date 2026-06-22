package com.alug.backend.repository;

import com.alug.backend.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    // RF-003
    List<Cliente> findByNomeContainingIgnoreCase(String nome);

    Optional<Cliente> findByCpf(String cpf);
    Optional<Cliente> findByEmail(String email);
}