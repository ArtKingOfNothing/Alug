package com.alug.backend.repository;

import com.alug.backend.model.Espaco;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EspacoRepository extends JpaRepository<Espaco, Integer> {
    // RF-020
    Optional<Espaco> findByEndereco_LogradouroContainingIgnoreCase(String logradouro);
}