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
# 6. Padrões de Uso do Git

Esta seção estabelece as regras de utilização do Git e do GitHub adotadas pela equipe, com o objetivo de padronizar o desenvolvimento colaborativo, facilitar o controle de versões, manter um histórico organizado e garantir a rastreabilidade das alterações realizadas durante o projeto.

## 6.1. Organização de Pastas

O repositório é organizado de forma a separar o código-fonte da documentação do projeto, facilitando a manutenção e a localização dos arquivos.

A estrutura adotada é composta pelas seguintes pastas:

* **docs/**: contém toda a documentação do projeto, como requisitos, diagramas, atas de reunião e demais documentos produzidos pela equipe;
* **src/**: contém o código-fonte da aplicação;
* **tests/**: armazena os testes desenvolvidos para o sistema;
* **assets/**: reúne imagens, ícones e outros arquivos utilizados pelo projeto.

Sempre que possível, os documentos serão escritos em formato **Markdown (.md)**, permitindo visualização direta no GitHub e melhor controle de versionamento.

---

## 6.2. Uso de Branches

A branch **main** representa a versão estável do projeto e não deve receber commits diretamente. Todas as alterações deverão ser desenvolvidas em branches específicas e posteriormente integradas por meio de Pull Request.

As branches deverão seguir um padrão de nomenclatura que identifique o tipo de alteração realizada, como desenvolvimento de novas funcionalidades, correções de erros ou atualização da documentação.

Os nomes das branches deverão ser escritos em letras minúsculas, utilizando hífen para separar palavras quando necessário e, sempre que possível, referenciar o requisito funcional correspondente.

Após a aprovação e integração na branch **main**, a branch de desenvolvimento deverá ser removida para manter o repositório organizado.

---

## 6.3. Padrão de Commits

As mensagens de commit deverão ser claras, objetivas e seguir um padrão único para facilitar o entendimento do histórico de alterações.

Cada mensagem deverá indicar o tipo da alteração realizada, seguido de uma breve descrição da modificação efetuada.

Os tipos de commit adotados pela equipe são:

| Tipo         | Utilização                                                 |
| ------------ | ---------------------------------------------------------- |
| **feat**     | Implementação de nova funcionalidade                       |
| **fix**      | Correção de erros                                          |
| **docs**     | Alterações na documentação                                 |
| **style**    | Alterações de formatação sem modificar a lógica do sistema |
| **refactor** | Reestruturação de código sem alterar seu comportamento     |
| **test**     | Inclusão ou modificação de testes                          |
| **chore**    | Configurações, manutenção e atualização de dependências    |

Sempre que possível, cada commit deverá representar apenas uma alteração específica, facilitando a rastreabilidade, a revisão e a reversão de mudanças, quando necessário.

---

## 6.4. Arquivo `.gitignore`

O projeto utiliza um arquivo **.gitignore** localizado na raiz do repositório para impedir o versionamento de arquivos temporários, dependências, arquivos de configuração local e artefatos gerados automaticamente.

Serão ignorados arquivos compilados, arquivos temporários, dependências instaladas por gerenciadores de pacotes, diretórios de compilação, arquivos de configuração das IDEs, arquivos do sistema operacional e arquivos de configuração locais utilizados apenas durante o desenvolvimento.

Essa configuração mantém o repositório organizado, evita o armazenamento de arquivos desnecessários e reduz problemas causados pelo compartilhamento de configurações específicas de cada ambiente de desenvolvimento.



## Versionamento e Releases

As versões publicadas representam marcos das sprints iniciais.

- 0.1: Sprint 0 (README e organização inicial)
- 1.0: Sprint 1 (atualizações de requisitos/rastreabilidade do backlog)

Observação: estas versões ainda não representam um produto executável.
