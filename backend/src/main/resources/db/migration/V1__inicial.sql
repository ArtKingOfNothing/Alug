CREATE SCHEMA IF NOT EXISTS `alug_db` DEFAULT CHARACTER SET utf8 ;
USE `alug_db` ;

CREATE TABLE IF NOT EXISTS `alug_db`.`enderecos` (
    `id_endereco` INT NOT NULL AUTO_INCREMENT,
    `cep` VARCHAR(8) NOT NULL,
    `logradouro` VARCHAR(100) NOT NULL,
    `numero` VARCHAR(10) NOT NULL,
    `complemento` VARCHAR(45) NULL,
    `bairro` VARCHAR(50) NOT NULL,
    `cidade` VARCHAR(50) NOT NULL,
    `estado` VARCHAR(2) NOT NULL,
    PRIMARY KEY (`id_endereco`)
    );

CREATE TABLE IF NOT EXISTS `alug_db`.`clientes` (
    `id_cliente` INT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,
    `telefone` VARCHAR(12) NOT NULL,
    `enderecos_id_endereco` INT NOT NULL,
    PRIMARY KEY (`id_cliente`),
    UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
    UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC) VISIBLE,
    UNIQUE INDEX `telefone_UNIQUE` (`telefone` ASC) VISIBLE,
    INDEX `fk_clientes_enderecos_idx` (`enderecos_id_endereco` ASC) VISIBLE,
    CONSTRAINT `fk_clientes_enderecos`
    FOREIGN KEY (`enderecos_id_endereco`)
    REFERENCES `alug_db`.`enderecos` (`id_endereco`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    );

CREATE TABLE IF NOT EXISTS `alug_db`.`gerentes` (
    `id_gerente` INT NOT NULL AUTO_INCREMENT,
     `nome` VARCHAR(100) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,
    `telefone` VARCHAR(12) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `enderecos_id_endereco` INT NOT NULL,
    PRIMARY KEY (`id_gerente`),
    UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC) VISIBLE,
    UNIQUE INDEX `telefone_UNIQUE` (`telefone` ASC) VISIBLE,
    UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
    INDEX `fk_gerentes_enderecos1_idx` (`enderecos_id_endereco` ASC) VISIBLE,
    CONSTRAINT `fk_gerentes_enderecos1`
    FOREIGN KEY (`enderecos_id_endereco`)
    REFERENCES `alug_db`.`enderecos` (`id_endereco`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    );

CREATE TABLE IF NOT EXISTS `alug_db`.`espacos` (
    `id_espaco` INT NOT NULL AUTO_INCREMENT,
    `capacidade` INT NOT NULL,
    `valor` FLOAT NOT NULL,
    `enderecos_id_endereco` INT NOT NULL,
    PRIMARY KEY (`id_espaco`),
    INDEX `fk_espacos_enderecos1_idx` (`enderecos_id_endereco` ASC) VISIBLE,
    UNIQUE INDEX `enderecos_id_endereco_UNIQUE` (`enderecos_id_endereco` ASC) VISIBLE,
    CONSTRAINT `fk_espacos_enderecos1`
    FOREIGN KEY (`enderecos_id_endereco`)
    REFERENCES `alug_db`.`enderecos` (`id_endereco`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    );

CREATE TABLE IF NOT EXISTS `alug_db`.`reservas` (
    `id_reserva` INT NOT NULL AUTO_INCREMENT,
    `data_evento` DATE NOT NULL DEFAULT (CURRENT_DATE),
    `quantidade_convidados` INT NOT NULL,
    `valor_total` FLOAT NOT NULL,
    `clientes_id_cliente` INT NOT NULL,
    `gerentes_id_gerente` INT NOT NULL,
    `espacos_id_espaco` INT NOT NULL,
    PRIMARY KEY (`id_reserva`),
    INDEX `fk_reservas_clientes1_idx` (`clientes_id_cliente` ASC) VISIBLE,
    INDEX `fk_reservas_gerentes1_idx` (`gerentes_id_gerente` ASC) VISIBLE,
    INDEX `fk_reservas_espacos1_idx` (`espacos_id_espaco` ASC) VISIBLE,
    UNIQUE INDEX `impede_choque_data_UNIQUE` (`espacos_id_espaco` ASC, `data_evento` ASC) VISIBLE,
    CONSTRAINT `fk_reservas_clientes1`
    FOREIGN KEY (`clientes_id_cliente`)
    REFERENCES `alug_db`.`clientes` (`id_cliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `fk_reservas_gerentes1`
    FOREIGN KEY (`gerentes_id_gerente`)
    REFERENCES `alug_db`.`gerentes` (`id_gerente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `fk_reservas_espacos1`
    FOREIGN KEY (`espacos_id_espaco`)
    REFERENCES `alug_db`.`espacos` (`id_espaco`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    );

CREATE TABLE IF NOT EXISTS `alug_db`.`convidados` (
    `id_convidado` INT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `telefone` VARCHAR(12) NOT NULL,
    `reservas_id_reserva` INT NOT NULL,
    PRIMARY KEY (`id_convidado`),
    INDEX `fk_convidados_reservas1_idx` (`reservas_id_reserva` ASC) VISIBLE,
    CONSTRAINT `fk_convidados_reservas1`
    FOREIGN KEY (`reservas_id_reserva`)
    REFERENCES `alug_db`.`reservas` (`id_reserva`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
    );
