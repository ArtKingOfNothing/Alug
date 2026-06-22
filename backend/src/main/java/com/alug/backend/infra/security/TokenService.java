package com.alug.backend.infra.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    public String gerarToken(String email) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.create()
                    .withIssuer("alug-api")
                    .withSubject(email)
                    .withExpiresAt(Instant.now().plus(1, ChronoUnit.DAYS))
                    .sign(algorithm);
        } catch (JWTCreationException excecao) {
            throw new RuntimeException("Erro ao gerar token", excecao);
        }
    }

    public String validarToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("alug-api")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException excecao) {
            return null;
        }
    }
}