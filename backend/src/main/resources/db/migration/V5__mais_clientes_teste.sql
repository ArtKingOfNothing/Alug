-- Novos endereços para clientes de teste
INSERT INTO `alug_db`.`enderecos` (cep, logradouro, numero, complemento, bairro, cidade, estado)
VALUES ('37200040', 'Rua das Flores', '22', NULL, 'Centro', 'Lavras', 'MG');
SET @end6 = LAST_INSERT_ID();

INSERT INTO `alug_db`.`enderecos` (cep, logradouro, numero, complemento, bairro, cidade, estado)
VALUES ('37200050', 'Av. Brasil', '300', NULL, 'Jardim América', 'Lavras', 'MG');
SET @end7 = LAST_INSERT_ID();

INSERT INTO `alug_db`.`enderecos` (cep, logradouro, numero, complemento, bairro, cidade, estado)
VALUES ('37200060', 'Rua São Paulo', '15', 'Apt 2', 'Santa Cruz', 'Lavras', 'MG');
SET @end8 = LAST_INSERT_ID();

-- Clientes adicionais
INSERT INTO `alug_db`.`clientes` (nome, email, cpf, telefone, enderecos_id_endereco)
VALUES ('Carlos Souza', 'carlos.souza@email.com', '22233344455', '35992222222', @end6);

INSERT INTO `alug_db`.`clientes` (nome, email, cpf, telefone, enderecos_id_endereco)
VALUES ('Maria Silva', 'maria.silva@email.com', '33344455566', '35993333333', @end7);

INSERT INTO `alug_db`.`clientes` (nome, email, cpf, telefone, enderecos_id_endereco)
VALUES ('Joao Pereira', 'joao.pereira@email.com', '44455566677', '35994444444', @end8);
