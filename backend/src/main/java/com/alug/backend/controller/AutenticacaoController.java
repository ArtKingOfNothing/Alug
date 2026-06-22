package com.alug.backend.controller;

import com.alug.backend.dto.LoginRequestDTO;
import com.alug.backend.dto.TokenResponseDTO;
import com.alug.backend.infra.security.TokenService;
import com.alug.backend.model.Gerente;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AutenticacaoController {

    private final AuthenticationManager gerenciadorDeAutenticacao;
    private final TokenService tokenService;

    public AutenticacaoController(AuthenticationManager gerenciadorDeAutenticacao, TokenService tokenService) {
        this.gerenciadorDeAutenticacao = gerenciadorDeAutenticacao;
        this.tokenService = tokenService;
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponseDTO> login(@RequestBody @Valid LoginRequestDTO dados) {
        var credenciais = new UsernamePasswordAuthenticationToken(dados.email(), dados.senha());

        var autenticacao = this.gerenciadorDeAutenticacao.authenticate(credenciais);

        var token = tokenService.gerarToken(((Gerente) autenticacao.getPrincipal()).getEmail());

        return ResponseEntity.ok(new TokenResponseDTO(token));
    }
}