# Alug

Projeto acadêmico de um sistema para gestão de locações.

## Status do Projeto

Atualmente este repositório contém somente as entregas das Sprints 0 e 1:

- levantamento e análise de requisitos
- casos de uso e modelagem inicial
- padrões adotados para verificação e análise
- prototipação e planejamento técnico

Não há implementação funcional (frontend/backend) nesta versão do repositório.

## 1. CONTEXTO DO PROBLEMA E SOLUÇÃO

### Problema

Empresas de locação enfrentam problemas recorrentes:

- informações de clientes e locações espalhadas em planilhas
- dificuldade para acompanhar contratos ativos e vencidos
- pouca rastreabilidade de alterações e histórico
- retrabalho operacional e baixa visibilidade gerencial

### Descrição da solução

O Alug foi definido para ser um sistema web que centraliza o ciclo de locação, cobrindo:

- cadastro de clientes e itens para locação
- gestão de contratos e renovações
- acompanhamento de disponibilidade e status
- apoio à decisão com consultas e indicadores

Quando implementado, o sistema deverá permitir o cadastro de clientes e itens, criação e acompanhamento de contratos de locação e controle do ciclo de atendimento por interface web.

## 2. INSTRUÇÕES PARA USO

Como o projeto ainda está em fase de prototipação (Sprints 0 e 1), o uso atual é documental.

### 2.1 Como baixar o projeto

Opção 1 (Git):

```bash
git clone https://github.com/ArtKingOfNothing/Alug.git
cd Alug
```

Opção 2 (ZIP):

1. Acesse o repositório no GitHub.
2. Clique em Code > Download ZIP.
3. Extraia o arquivo e abra a pasta local.

### 2.2 Como acessar o conteúdo atual

- Leia os artefatos em Requisitos
- Leia os artefatos em Padrões Adotados
- Consulte este README para contexto e planejamento técnico

### 2.3 Instalar e rodar a aplicação

No estado atual (Sprints 0 e 1), ainda não existe aplicação executável.

Assim que o código for publicado nas próximas sprints, o fluxo esperado para qualquer colega subir na máquina será:

```bash
docker compose up --build -d
```

E o acesso previsto no navegador será:

- Frontend: http://localhost:5173
- Backend: http://localhost:8080

### 2.4 Banco de dados

O banco planejado é MySQL com migrações Flyway no backend Spring Boot.

No estado atual, não há script de criação/execução de banco publicado porque o backend ainda não foi implementado.

## 3. INSTRUÇÕES PARA DEVS

Estas instruções seguem o modelo solicitado e preparam um DEV para evoluir o projeto a partir da base documental atual.

### 3.1 Clone o projeto na sua máquina aplicando o comando

```bash
git clone https://github.com/ArtKingOfNothing/Alug.git
cd Alug
```

Você também pode baixar o ZIP no GitHub (Code > Download ZIP), extrair e abrir a pasta local.

### 3.2 Execute o comando para instalar bibliotecas e outras dependências

No estado atual, ainda não há módulos de frontend/backend para instalar dependências.

Comandos planejados para a fase de implementação:

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

### 3.3 Para executar o projeto, vá para a pasta X e execute o comando

No estado atual, a execução ainda não é possível porque o código não foi implementado.

Fluxo previsto para a sprint de implementação:

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

### Situação atual do repositório

- ainda não existe módulo frontend implementado
- ainda não existe módulo backend implementado
- ainda não existe pipeline de build/test/deploy configurado

Próximo passo técnico previsto:

- Front: React + TypeScript
- Back: Spring Boot
- Banco: MySQL com Flyway
- Containerização: Docker

## 4. TECNOLOGIAS

### Tecnologias planejadas para implementação

- React + TypeScript (frontend)
- Spring Boot (backend)
- MySQL (persistência)
- Flyway (migrações de banco)
- Docker e Docker Compose (containerização)

### Tecnologias já usadas nesta fase

- Git e GitHub para versionamento
- Documentação de requisitos e modelagem (arquivos em Requisitos e Padrões Adotados)

## 5. ORGANIZAÇÃO DO PROJETO

Estrutura atual do repositório:

```text
Alug/
├─ Requisitos/                     # Documento de requisitos e casos de uso
├─ Padrões Adotados/               # Regras e padrões de verificação/análise
└─ README.md                       # Documento principal do projeto
```

## Versionamento e Releases

As versões publicadas representam marcos das sprints iniciais.

- 0.1: Sprint 0 (README e organização inicial)
- 1.0: Sprint 1 (atualizações de requisitos/rastreabilidade do backlog)

Observação: estas versões ainda não representam um produto executável.