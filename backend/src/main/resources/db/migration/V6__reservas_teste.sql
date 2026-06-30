-- V6: reservas de teste
INSERT INTO reservas (data_evento, quantidade_convidados, valor_total, clientes_id_cliente, gerentes_id_gerente, espacos_id_espaco)
VALUES ('2026-07-15', 30, 1280.00, 1, 1, 1);

INSERT INTO reservas (data_evento, quantidade_convidados, valor_total, clientes_id_cliente, gerentes_id_gerente, espacos_id_espaco)
VALUES ('2026-07-20', 20, 820.00, 2, 1, 3);

INSERT INTO reservas (data_evento, quantidade_convidados, valor_total, clientes_id_cliente, gerentes_id_gerente, espacos_id_espaco)
VALUES ('2026-08-05', 25, 740.00, 3, 1, 2);

-- convidados para a reserva 1
SET @res1 = (SELECT id_reserva FROM reservas ORDER BY id_reserva LIMIT 1);
INSERT INTO convidados (nome, telefone, reservas_id_reserva) VALUES ('Pedro Alves', '35991111111', @res1);
INSERT INTO convidados (nome, telefone, reservas_id_reserva) VALUES ('Lucia Ferreira', '35992222222', @res1);

-- convidados para a reserva 2
SET @res2 = (SELECT id_reserva FROM reservas ORDER BY id_reserva LIMIT 1 OFFSET 1);
INSERT INTO convidados (nome, telefone, reservas_id_reserva) VALUES ('Fernanda Lima', '35993333333', @res2);
