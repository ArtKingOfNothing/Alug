package com.alug.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.br.CPF;
import lombok.Data;

@Data
@Entity
@Table(name = "gerentes")
public class Gerente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_gerente")
    private Integer idGerente;

    @NotBlank
    @Column(nullable = false, length = 100)
    private String nome;

    @NotBlank
    @CPF(message = "CPF inválido")
    @Column(nullable = false, unique = true, length = 11)
    private String cpf;

    @NotBlank
    @Column(nullable = false, unique = true, length = 12)
    private String telefone;

    @NotBlank
    @Email(message = "Formato de e-mail inválido")
    @Column(nullable = false, unique = true, length = 50)
    private String email;

    @NotBlank
    @Column(nullable = false, length = 255)
    private String senha;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "enderecos_id_endereco", nullable = false)
    private Endereco endereco;
}