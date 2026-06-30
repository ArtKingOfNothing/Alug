package com.alug.backend;

import com.alug.backend.controller.ClienteController;
import com.alug.backend.infra.security.TokenService;
import com.alug.backend.model.Cliente;
import com.alug.backend.repository.GerenteRepository;
import com.alug.backend.service.AutorizacaoService;
import com.alug.backend.service.ClienteService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ClienteController.class)
@DisplayName("Testes de Sistema - ClienteController")
class ClienteControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ClienteService clienteService;

    @MockitoBean
    private TokenService tokenService;

    @MockitoBean
    private GerenteRepository gerenteRepository;

    @MockitoBean
    private AutorizacaoService autorizacaoService;

    @Test
    @WithMockUser(roles = "GERENTE_COMUM")
    @DisplayName("GET /clientes deve retornar lista vazia com status 200")
    void deveListarTodosOsClientes_retornaStatus200() throws Exception {
        when(clienteService.listarTodos()).thenReturn(List.of());

        mockMvc.perform(get("/clientes")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json("[]"));
    }

    @Test
    @WithMockUser(roles = "GERENTE_COMUM")
    @DisplayName("GET /clientes/{id} deve retornar dados do cliente com status 200")
    void deveConsultarClientePorId_retornaStatus200() throws Exception {
        Cliente cliente = new Cliente();
        cliente.setIdCliente(1);
        cliente.setNome("Ana Costa");
        cliente.setEmail("ana@email.com");
        cliente.setCpf("12345678901");
        cliente.setTelefone("35991234567");

        when(clienteService.consultarClientePorId(1)).thenReturn(cliente);

        mockMvc.perform(get("/clientes/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.idCliente").value(1))
                .andExpect(jsonPath("$.nome").value("Ana Costa"));
    }

    @Test
    @WithMockUser(roles = "GERENTE_COMUM")
    @DisplayName("DELETE /clientes/{id} deve remover cliente e retornar status 204")
    void deveDeletarCliente_retornaStatus204() throws Exception {
        doNothing().when(clienteService).removerCliente(1);

        mockMvc.perform(delete("/clientes/1"))
                .andExpect(status().isNoContent());

        verify(clienteService, times(1)).removerCliente(1);
    }
}
