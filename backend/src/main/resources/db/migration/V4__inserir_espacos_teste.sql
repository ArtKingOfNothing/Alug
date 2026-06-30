-- Endereços para os espaços
INSERT INTO `alug_db`.`enderecos` (cep, logradouro, numero, complemento, bairro, cidade, estado)
VALUES
  ('37200000', 'Av. Central', '100', NULL, 'Centro', 'Lavras', 'MG'),
  ('37200010', 'Rua das Palmeiras', '80', NULL, 'Jardim', 'Lavras', 'MG'),
  ('37200020', 'Rua Nova', '200', NULL, 'Santa Cruz', 'Lavras', 'MG');

-- Espaços de teste
INSERT INTO `alug_db`.`espacos` (capacidade, valor, enderecos_id_endereco)
VALUES
  (42, 1280.00, 2),
  (30, 740.00, 3),
  (20, 820.00, 4);

-- Endereço e cliente de teste
INSERT INTO `alug_db`.`enderecos` (cep, logradouro, numero, complemento, bairro, cidade, estado)
VALUES ('37200030', 'Rua A', '10', NULL, 'Centro', 'Lavras', 'MG');

INSERT INTO `alug_db`.`clientes` (nome, email, cpf, telefone, enderecos_id_endereco)
VALUES ('Ana Monteiro', 'ana@email.com', '11122233344', '35991111111', 5);
