package com.alug.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record ReservaRequestDTO(

        @NotNull(message = "A data do evento é obrigatória")
        LocalDate dataEvento,

        @NotNull(message = "A quantidade de convidados é obrigatória")
        @Min(value = 1, message = "A quantidade de convidados deve ser maior que zero")
        Integer quantidadeConvidados,

        @NotNull(message = "O valor total é obrigatório")
        Float valorTotal,

        @NotNull(message = "O ID do cliente é obrigatório")
        Integer idCliente,

        @NotNull(message = "O ID do gerente é obrigatório")
        Integer idGerente,

        @NotNull(message = "O ID do espaço é obrigatório")
        Integer idEspaco
) {}
