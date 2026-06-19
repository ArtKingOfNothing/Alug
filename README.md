# Alug

Projeto academico de um sistema para gestao de locacoes.

## Status do Projeto

Atualmente este repositorio contem somente as entregas das Sprints 0 e 1:

- levantamento e analise de requisitos
- casos de uso e modelagem inicial
- padroes adotados para verificacao e analise
- prototipacao e planejamento tecnico

Nao ha implementacao funcional (frontend/backend) nesta versao do repositorio.

## 1. Contexto do Problema e Solucao

### Problema

Empresas de locacao enfrentam problemas recorrentes:

- informacoes de clientes e locacoes espalhadas em planilhas
- dificuldade para acompanhar contratos ativos e vencidos
- pouca rastreabilidade de alteracoes e historico
- retrabalho operacional e baixa visibilidade gerencial

### Solucao Proposta

O Alug foi definido para ser um sistema web que centraliza o ciclo de locacao, cobrindo:

- cadastro de clientes e itens para locacao
- gestao de contratos e renovacoes
- acompanhamento de disponibilidade e status
- apoio a decisao com consultas e indicadores

## 2. Instrucoes para Uso

Como o projeto ainda esta em fase de prototipacao (Sprints 0 e 1), o uso atual e documental.

### 2.1 Como baixar

Opcao 1 (Git):

```bash
git clone https://github.com/ArtKingOfNothing/Alug.git
cd Alug
```

Opcao 2 (ZIP):

1. Acesse o repositorio no GitHub.
2. Clique em Code > Download ZIP.
3. Extraia o arquivo e abra a pasta local.

### 2.2 Como acessar o conteudo atual

- Leia os artefatos em Requisitos
- Leia os artefatos em Padroes Adotados
- Consulte este README para contexto e planejamento tecnico

## 3. Instrucoes para DEVs

Estas instrucoes preparam um DEV para evoluir o projeto a partir da base documental atual.

### 3.1 Clonar o projeto

```bash
git clone https://github.com/ArtKingOfNothing/Alug.git
cd Alug
```

### 3.2 Estado atual

- ainda nao existe modulo frontend implementado
- ainda nao existe modulo backend implementado
- ainda nao existe pipeline de build/test/deploy configurado

### 3.3 Proximo passo tecnico previsto

Quando a Sprint de implementacao iniciar, a arquitetura planejada e:

- Front: React + TypeScript
- Back: Spring Boot
- Banco: MySQL com Flyway
- Containerizacao: Docker

## 4. Tecnologias

### Tecnologias planejadas para implementacao

- React + TypeScript (frontend)
- Spring Boot (backend)
- MySQL (persistencia)
- Flyway (migracoes de banco)
- Docker e Docker Compose (containerizacao)

### Tecnologias ja usadas nesta fase

- Git e GitHub para versionamento
- Documentacao de requisitos e modelagem (arquivos em Requisitos e Padroes Adotados)

## 5. Organizacao do Projeto

Estrutura atual do repositorio:

```text
Alug/
├─ Requisitos/                     # Documento de requisitos e casos de uso
├─ Padrões Adotados/               # Regras e padroes de verificacao/analise
└─ README.md                       # Documento principal do projeto
```

## Versionamento e Releases

As versoes publicadas representam marcos das sprints iniciais.

- v0.1: entrega inicial da fase de levantamento/prototipacao
- v1.0: consolidacao documental das Sprints 0 e 1

Observacao: estas versoes ainda nao representam um produto executavel.