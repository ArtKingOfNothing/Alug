package com.alug.backend.repository;

import com.alug.backend.model.Convidado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConvidadoRepository extends JpaRepository<Convidado, Integer> {
    //RF-017
    List<Convidado> findByReservaIdReserva(Integer idReserva);
}