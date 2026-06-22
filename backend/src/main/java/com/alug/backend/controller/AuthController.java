package com.alug.backend.controller;

import com.alug.backend.dto.LoginRequestDTO;
import com.alug.backend.dto.LoginResponseDTO;
import com.alug.backend.infra.security.TokenService;
import com.alug.backend.model.Gerente;
import com.alug.backend.repository.GerenteRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final GerenteRepository gerenteRepository;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;

    public AuthController(
            GerenteRepository gerenteRepository,
            TokenService tokenService,
            PasswordEncoder passwordEncoder
    ) {
        this.gerenteRepository = gerenteRepository;
        this.tokenService = tokenService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO body) {
        Optional<Gerente> gerenteOptional = gerenteRepository.findByEmail(body.email());

        if (gerenteOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("mensagem", "credenciais invalidas"));
        }

        Gerente gerente = gerenteOptional.get();
        if (!passwordEncoder.matches(body.senha(), gerente.getSenha())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("mensagem", "credenciais invalidas"));
        }

        String token = tokenService.gerarToken(gerente.getEmail());
        LoginResponseDTO response = new LoginResponseDTO(
                token,
                gerente.getNome(),
                gerente.getEmail(),
                gerente.getPerfil().name()
        );

        return ResponseEntity.ok(response);
    }
}
