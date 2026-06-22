package com.alug.backend.infra.security;

import com.alug.backend.repository.GerenteRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class FiltroDeSegurança extends OncePerRequestFilter {

    private final TokenService tokenService;
    private final GerenteRepository gerenteRepository;

    public FiltroDeSegurança(TokenService tokenService, GerenteRepository gerenteRepository) {
        this.tokenService = tokenService;
        this.gerenteRepository = gerenteRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // Pular validação de token para o endpoint de login
        String requestPath = request.getRequestURI();
        if (requestPath.equals("/auth/login")) {
            filterChain.doFilter(request, response);
            return;
        }

        var token = this.recuperarToken(request);
        if (token != null) {
            var email = tokenService.validarToken(token);
            if (email != null) {
                var gerente = gerenteRepository.findByEmail(email);

                if (gerente != null) {
                    var authentication = new UsernamePasswordAuthenticationToken(gerente, null, gerente.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }
        filterChain.doFilter(request, response);
    }

    private String recuperarToken(HttpServletRequest request) {
        var authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }
}