package com.alug.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.br.CPF;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Entity
@Table(name = "gerentes")
public class Gerente implements UserDetails {

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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PerfilAcesso perfil = PerfilAcesso.GERENTE_COMUM;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "enderecos_id_endereco", nullable = false)
    private Endereco endereco;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() { // super admin tem tudo que gerente tem + plus
        if (this.perfil == PerfilAcesso.SUPER_ADMIN) {
            return List.of(
                    new SimpleGrantedAuthority("ROLE_SUPER_ADMIN"),
                    new SimpleGrantedAuthority("ROLE_GERENTE_COMUM")
            );
        } else {
            return List.of(new SimpleGrantedAuthority("ROLE_GERENTE_COMUM"));
        }
    }

    @Override
    public String getPassword() {
        return this.senha;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}