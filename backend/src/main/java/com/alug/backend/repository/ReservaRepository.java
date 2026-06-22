package com.alug.backend.repository;

import com.alug.backend.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;


@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Integer> {

    //RF-007
    boolean existsByEspacoIdEspacoAndDataEvento(Integer idEspaco, LocalDate dataEvento);
}