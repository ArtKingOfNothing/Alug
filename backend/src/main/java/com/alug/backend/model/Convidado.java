package com.alug.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Entity
@Table(name = "convidados")
public class Convidado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_convidado")
    private Integer idConvidado;

    @NotBlank
    @Column(nullable = false, length = 100)
    private String nome;

    @NotBlank
    @Column(nullable = false, length = 12)
    private String telefone;

    @ManyToOne
    @JoinColumn(name = "reservas_id_reserva", nullable = false)
    private Reserva reserva;
}