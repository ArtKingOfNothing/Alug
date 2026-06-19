# Alug

Sistema web para gestao de locacoes com foco em padronizacao do processo de atendimento, controle de contratos e acompanhamento de clientes.

## 1. Contexto do Problema e Solucao

### Problema
Negocios de locacao costumam enfrentar dificuldades como:

- Cadastro descentralizado de clientes e itens para locacao.
- Falta de rastreabilidade de contratos ativos, vencidos e renovacoes.
- Processos manuais para acompanhar disponibilidade, pagamentos e historico.
- Baixa visibilidade gerencial para tomada de decisao.

### Solucao
O Alug propoe uma plataforma web completa para operacao de locacoes, oferecendo:

- Cadastro e manutencao de clientes, itens/produtos e contratos.
- Fluxo de criacao, consulta e atualizacao de locacoes em interface web.
- API backend para regras de negocio, seguranca e integracoes.
- Persistencia em MySQL com versionamento de schema via Flyway.
- Execucao padronizada via Docker, facilitando setup e deploy.

## 2. Instrucoes para Uso (Usuario Final)

Estas instrucoes sao para quem quer rodar o sistema localmente para testar/usar, sem precisar conhecer detalhes de desenvolvimento.

### 2.1 Requisitos minimos

- Docker Desktop instalado e em execucao.
- Docker Compose habilitado.
- Navegador web atualizado (Chrome, Edge ou Firefox).

### 2.2 Baixar o projeto

Opcao 1 (recomendada): clonar com Git

```bash
git clone https://github.com/ArtKingOfNothing/Alug.git
cd Alug
```

Opcao 2: baixar ZIP

1. Acesse o repositorio no GitHub.
2. Clique em Code > Download ZIP.
3. Extraia o arquivo.
4. Abra a pasta extraida no terminal.

### 2.3 Subir aplicacao com Docker

> Se o projeto estiver organizado em `frontend/` e `backend/`, execute os comandos na raiz onde estiver o `docker-compose.yml`.

```bash
docker compose up --build -d
```

### 2.4 Acessar o sistema

- Frontend: http://localhost:5173
- Backend API: http://localhost:8080

### 2.5 Parar o sistema

```bash
docker compose down
```

### 2.6 Banco de dados

- O banco MySQL e iniciado via Docker.
- As migracoes Flyway sao aplicadas automaticamente na inicializacao do backend.

Se quiser resetar completamente os dados locais:

```bash
docker compose down -v
docker compose up --build -d
```

## 3. Instrucoes para DEVs

Siga este passo a passo para preparar seu ambiente de desenvolvimento.

### 3.1 Clonar o projeto

```bash
git clone https://github.com/ArtKingOfNothing/Alug.git
cd Alug
```

Alternativa: baixar ZIP e extrair localmente.

### 3.2 Instalar dependencias

Frontend (React + TypeScript):

```bash
cd frontend
npm install
```

Backend (Spring Boot):

```bash
cd ../backend
./mvnw clean install
```

No Windows, caso necessario:

```bash
mvnw.cmd clean install
```

### 3.3 Executar em modo desenvolvimento

Backend:

```bash
cd backend
./mvnw spring-boot:run
```

Frontend:

```bash
cd frontend
npm run dev
```

Acesse no navegador:

- Frontend: http://localhost:5173
- API: http://localhost:8080

### 3.4 Rodar com Docker (ambiente integrado)

```bash
docker compose up --build
```

### 3.5 Variaveis de ambiente (exemplo)

Backend (`backend/.env` ou `application.properties`):

```env
SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/alug
SPRING_DATASOURCE_USERNAME=alug_user
SPRING_DATASOURCE_PASSWORD=alug_pass
SPRING_JPA_HIBERNATE_DDL_AUTO=validate
SPRING_FLYWAY_ENABLED=true
```

Frontend (`frontend/.env`):

```env
VITE_API_BASE_URL=http://localhost:8080
```

## 4. Tecnologias

- Frontend: React + TypeScript
- Backend: Spring Boot (Java)
- Banco de Dados: MySQL
- Migracoes de Banco: Flyway
- Containerizacao: Docker + Docker Compose

## 5. Organizacao do Projeto

Estrutura sugerida e finalidade de cada pasta/arquivo:

```text
Alug/
├─ frontend/                     # Aplicacao web React + TypeScript
│  ├─ src/                       # Codigo-fonte principal
│  │  ├─ components/             # Componentes reutilizaveis de UI
│  │  ├─ pages/                  # Paginas/telas da aplicacao
│  │  ├─ services/               # Comunicacao com API
│  │  ├─ hooks/                  # Hooks customizados
│  │  └─ utils/                  # Funcoes utilitarias
│  ├─ public/                    # Arquivos estaticos
│  └─ package.json               # Dependencias/scripts do frontend
│
├─ backend/                      # API Spring Boot
│  ├─ src/main/java/             # Codigo Java da aplicacao
│  ├─ src/main/resources/        # Configuracoes e recursos
│  ├─ src/test/                  # Testes automatizados
│  ├─ pom.xml                    # Dependencias/scripts Maven
│  └─ flyway/                    # Scripts SQL de migracao
│
├─ docs/                         # Documentacao complementar
├─ Requisitos/                   # Artefatos de requisitos e modelagem
├─ Padrões Adotados/             # Padroes de analise/verificacao
├─ docker-compose.yml            # Orquestracao dos containers
└─ README.md                     # Guia principal do projeto
```

## Versionamento e Releases

Este projeto utiliza tags semanticas para marcos de entrega:

- `v0.1`: versao inicial (estrutura e base do projeto)
- `v1.0`: primeira versao estavel

### Como criar localmente

```bash
git tag -a v0.1 -m "Release 0.1"
git tag -a v1.0 -m "Release 1.0"
```

### Como publicar no remoto

```bash
git push origin v0.1
git push origin v1.0
```

No GitHub, acesse a aba Releases e crie as releases usando as tags publicadas.