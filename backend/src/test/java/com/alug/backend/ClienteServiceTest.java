package com.alug.backend;

import com.alug.backend.model.Cliente;
import com.alug.backend.repository.ClienteRepository;
import com.alug.backend.service.ClienteService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Testes de Unidade - ClienteService")
class ClienteServiceTest {

    @Mock
    private ClienteRepository clienteRepository;

    @InjectMocks
    private ClienteService clienteService;

    @Test
    @DisplayName("Deve salvar cliente com sucesso quando CPF e e-mail são únicos")
    void deveSalvarClienteComSucesso() {
        Cliente cliente = new Cliente();
        cliente.setNome("João Silva");
        cliente.setEmail("joao@email.com");
        cliente.setCpf("12345678901");
        cliente.setTelefone("35991234567");

        when(clienteRepository.findByCpf(any())).thenReturn(Optional.empty());
        when(clienteRepository.findByEmail(any())).thenReturn(Optional.empty());
        when(clienteRepository.save(any())).thenReturn(cliente);

        Cliente resultado = clienteService.salvarCliente(cliente);

        assertThat(resultado).isNotNull();
        assertThat(resultado.getNome()).isEqualTo("João Silva");
        assertThat(resultado.getEmail()).isEqualTo("joao@email.com");
        verify(clienteRepository, times(1)).save(cliente);
    }

    @Test
    @DisplayName("Deve lançar exceção ao tentar salvar cliente com CPF já cadastrado")
    void deveLancarExcecaoComCpfDuplicado() {
        Cliente clienteExistente = new Cliente();
        clienteExistente.setCpf("12345678901");

        Cliente novoCliente = new Cliente();
        novoCliente.setCpf("12345678901");
        novoCliente.setEmail("novo@email.com");

        when(clienteRepository.findByCpf("12345678901")).thenReturn(Optional.of(clienteExistente));

        assertThatThrownBy(() -> clienteService.salvarCliente(novoCliente))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("CPF");

        verify(clienteRepository, never()).save(any());
    }

    @Test
    @DisplayName("Deve retornar cliente ao consultar por ID existente")
    void deveRetornarClienteAoConsultarPorId() {
        Cliente cliente = new Cliente();
        cliente.setIdCliente(1);
        cliente.setNome("Maria Oliveira");
        cliente.setEmail("maria@email.com");

        when(clienteRepository.findById(1)).thenReturn(Optional.of(cliente));

        Cliente resultado = clienteService.consultarClientePorId(1);

        assertThat(resultado).isNotNull();
        assertThat(resultado.getIdCliente()).isEqualTo(1);
        assertThat(resultado.getNome()).isEqualTo("Maria Oliveira");
    }
}
