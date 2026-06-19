# Alug

Projeto academico de um sistema para gestao de locacoes.

## Status do Projeto

Atualmente este repositorio contem somente as entregas das Sprints 0 e 1:

- levantamento e analise de requisitos
- casos de uso e modelagem inicial
- padroes adotados para verificacao e analise
- prototipacao e planejamento tecnico

Nao ha implementacao funcional (frontend/backend) nesta versao do repositorio.

## 1. CONTEXTO DO PROBLEMA E SOLUCAO

### Problema

Empresas de locacao enfrentam problemas recorrentes:

- informacoes de clientes e locacoes espalhadas em planilhas
- dificuldade para acompanhar contratos ativos e vencidos
- pouca rastreabilidade de alteracoes e historico
- retrabalho operacional e baixa visibilidade gerencial

### Descricao da solucao

O Alug foi definido para ser um sistema web que centraliza o ciclo de locacao, cobrindo:

- cadastro de clientes e itens para locacao
- gestao de contratos e renovacoes
- acompanhamento de disponibilidade e status
- apoio a decisao com consultas e indicadores

Quando implementado, o sistema devera permitir o cadastro de clientes e itens, criacao e acompanhamento de contratos de locacao e controle do ciclo de atendimento por interface web.

## 2. INSTRUCOES PARA USO

Como o projeto ainda esta em fase de prototipacao (Sprints 0 e 1), o uso atual e documental.

### 2.1 Como baixar o projeto

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

### 2.3 Instalar e rodar a aplicacao

No estado atual (Sprints 0 e 1), ainda nao existe aplicacao executavel.

Assim que o codigo for publicado nas proximas sprints, o fluxo esperado para qualquer colega subir na maquina sera:

```bash
docker compose up --build -d
```

E o acesso previsto no navegador sera:

- Frontend: http://localhost:5173
- Backend: http://localhost:8080

### 2.4 Banco de dados

O banco planejado e MySQL com migracoes Flyway no backend Spring Boot.

No estado atual, nao ha script de criacao/execucao de banco publicado porque o backend ainda nao foi implementado.

## 3. INSTRUCOES PARA DEVS

Estas instrucoes seguem o modelo solicitado e preparam um DEV para evoluir o projeto a partir da base documental atual.

### 3.1 Clone o projeto na sua maquina aplicando o comando

```bash
git clone https://github.com/ArtKingOfNothing/Alug.git
cd Alug
```

Voce tambem pode baixar o ZIP no GitHub (Code > Download ZIP), extrair e abrir a pasta local.

### 3.2 Execute o comando para instalar bibliotecas e outras dependencias

No estado atual, ainda nao ha modulos de frontend/backend para instalar dependencias.

Comandos planejados para a fase de implementacao:

```bash
# Frontend (React + TypeScript)
cd frontend
npm install

# Backend (Spring Boot)
cd ../backend
./mvnw clean install
```

No Windows, para backend:

```bash
mvnw.cmd clean install
```

### 3.3 Para executar o projeto, va para a pasta X e execute o comando

No estado atual, a execucao ainda nao e possivel porque o codigo nao foi implementado.

Fluxo previsto para a sprint de implementacao:

```bash
# Backend
cd backend
./mvnw spring-boot:run

# Frontend
cd frontend
npm run dev
```

Depois, acessar no browser:

- http://localhost:5173
- http://localhost:8080

### Situacao atual do repositorio

- ainda nao existe modulo frontend implementado
- ainda nao existe modulo backend implementado
- ainda nao existe pipeline de build/test/deploy configurado

Proximo passo tecnico previsto:

- Front: React + TypeScript
- Back: Spring Boot
- Banco: MySQL com Flyway
- Containerizacao: Docker

## 4. TECNOLOGIAS

### Tecnologias planejadas para implementacao

- React + TypeScript (frontend)
- Spring Boot (backend)
- MySQL (persistencia)
- Flyway (migracoes de banco)
- Docker e Docker Compose (containerizacao)

### Tecnologias ja usadas nesta fase

- Git e GitHub para versionamento
- Documentacao de requisitos e modelagem (arquivos em Requisitos e Padroes Adotados)

## 5. ORGANIZACAO DO PROJETO

Estrutura atual do repositorio:

```text
Alug/
├─ Requisitos/                     # Documento de requisitos e casos de uso
├─ Padrões Adotados/               # Regras e padroes de verificacao/analise
└─ README.md                       # Documento principal do projeto
```

## Versionamento e Releases

As versoes publicadas representam marcos das sprints iniciais.

- 0.1: Sprint 0 (README e organizacao inicial)
- 1.0: Sprint 1 (atualizacoes de requisitos/rastreabilidade do backlog)

Observacao: estas versoes ainda nao representam um produto executavel.