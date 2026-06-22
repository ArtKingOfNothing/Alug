package com.alug.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "espacos")
public class Espaco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_espaco")
    private Integer idEspaco;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private Integer capacidade;

    @Column(nullable = false)
    private Float valor;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "enderecos_id_endereco", nullable = false, unique = true)
    private Endereco endereco;
}