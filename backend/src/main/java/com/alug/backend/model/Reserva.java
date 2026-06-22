package com.alug.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(
        name = "reservas",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"espacos_id_espaco", "data_evento"})
        }
)
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_reserva")
    private Integer idReserva;

    @Column(name = "data_evento", nullable = false)
    private LocalDate dataEvento;

    @Column(name = "quantidade_convidados", nullable = false)
    private Integer quantidadeConvidados;

    @Column(name = "valor_total", nullable = false)
    private Float valorTotal;

    @ManyToOne
    @JoinColumn(name = "clientes_id_cliente", nullable = false)
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "gerentes_id_gerente", nullable = false)
    private Gerente gerente;

    @ManyToOne
    @JoinColumn(name = "espacos_id_espaco", nullable = false)
    private Espaco espaco;
}