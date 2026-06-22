-- Inserir endereço de teste
INSERT INTO `alug_db`.`enderecos` (cep, logradouro, numero, complemento, bairro, cidade, estado)
VALUES ('01310100', 'Avenida Paulista', '1000', 'Apto 101', 'Bela Vista', 'São Paulo', 'SP');
-- Inserir gerente de teste (SUPER_ADMIN)
-- Email: admin@alug.com
-- Senha: admin123 (hash BCrypt)
INSERT INTO `alug_db`.`gerentes` (nome, cpf, telefone, email, senha, enderecos_id_endereco, perfil)
VALUES (
    'Administrador Teste',
    '12345678901',
    '1133334444',
    'admin@alug.com',
    '$2a$10$6bv6Nfta/P9VkaHJgDYQB./mGiXXxSIPZHvM72IXc5pZpJIec7dq.',
    1,
    'SUPER_ADMIN'
);
