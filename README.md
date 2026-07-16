# BookStore Manager CLI (Acervo CLI) 📚

O **BookStore Manager CLI** é uma aplicação executada via terminal (Command Line Interface - CLI) desenvolvida para o gerenciamento de uma biblioteca/livraria. O sistema permite o controle completo, seguro e persistente de autores, livros, clientes e empréstimos.

## 🎯 Objetivo

Substituir os registros manuais por uma aplicação informatizada, garantindo a integridade dos dados, aplicando regras de negócio consistentes (como validação de estoque e inativação em cascata) e gerando relatórios precisos a partir de um banco de dados relacional.

## 🚀 Tecnologias Utilizadas

- **Back-End:** Node.js
- **Linguagem:** TypeScript
- **Banco de Dados:** PostgreSQL
- **Bibliotecas Principais:**
  - `pg` (node-postgres) para conexão direta e queries SQL.
  - `dotenv` para gerenciamento de variáveis de ambiente.
  - `bcrypt` para criptografia segura de senhas de usuários.
  - `@inquirer/prompts` para interações amigáveis e mascaramento de senhas no terminal.

## ⚙️ Requisitos para Execução

- **Node.js** (versão 16.x ou superior)
- **PostgreSQL** (versão 13.x ou superior) rodando localmente ou em nuvem
- **Git** para versionamento

## 🛠️ Configuração do Ambiente e Banco de Dados

1. Acesse o seu SGBD PostgreSQL e crie o banco de dados inicial (ex: `bookstore`).
2. Execute o script de criação localizado em `src/database/schema.sql` (ou equivalente no seu setup). Este script criará as tabelas `autores`, `livros`, `clientes`, `emprestimos` e `usuarios`.
3. Na raiz do projeto, crie um arquivo chamado `.env` e configure as credenciais:

```env
DB_USER=seu_usuario_postgres
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bookstore
ADMIN_LOGIN=admin
ADMIN_PASSWORD=sua_senha_segura
```

## 💻 Instalação e Inicialização

Clone este repositório e instale as dependências:

```bash
git clone https://github.com/dariph/bookstore-manager-cli.git
cd bookstore-manager-cli
npm install
```

Antes de iniciar a aplicação pela primeira vez, crie o usuário administrador rodando o script de seed (que fará o hash da senha definida no `.env`):

```bash
npx ts-node src/seed.ts
```

Para rodar o projeto em ambiente de desenvolvimento:

```bash
npm run dev
```

## 🏗️ Arquitetura do Projeto

O sistema adota o padrão de **Arquitetura em Camadas** (Clean Architecture/MVC), promovendo alta coesão e baixo acoplamento:

- **CLI (Menu):** Ponto de entrada (`main.ts`).
- **Controllers:** Interação com o usuário via terminal (`@inquirer/prompts`).
- **Services:** Regras de negócio, validações (ex: verificar estoque, formatar emails) e criptografia.
- **Repositories:** Comunicação exclusiva com o PostgreSQL.
- **Models:** Interfaces TypeScript (`types.ts`).

### 📁 Estrutura de Pastas

```text
📦 bookstore-manager-cli
┣ 📂 src
┃ ┣ 📂 controllers    # Controladores (Auth, Autores, Livros, etc.)
┃ ┣ 📂 database       # Conexão via pool do pg e scripts SQL
┃ ┣ 📂 models         # Interfaces TypeScript
┃ ┣ 📂 repositories   # Queries SQL puras
┃ ┣ 📂 services       # Lógica de negócio e tratamento de erros
┃ ┣ 📂 utils          # Funções utilitárias (CLI inputs, formatadores de data)
┃ ┣ 📜 main.ts        # Ponto de entrada da aplicação
┃ ┗ 📜 seed.ts        # Script para popular o usuário Admin
┣ 📜 .env             # Variáveis de ambiente
┣ 📜 package.json     # Dependências e scripts
┗ 📜 README.md        # Documentação do projeto
```

## ✅ Funcionalidades Implementadas

- **🔒 Autenticação:** Sistema de login obrigatório para acessar o menu principal, com limite de 3 tentativas e senhas protegidas por hash (`bcrypt`).
- **👥 Gerenciamento de Autores e Clientes:** Cadastro, listagem, consulta por ID, atualização e **Inativação Lógica** (Soft Delete, alterando a flag `ativo = FALSE`).
- **📚 Gerenciamento de Livros:** Cadastro vinculado a autores, inativação e **Listagem Paginada** (limite de 10 itens por página).
- **🔄 Gestão de Empréstimos:**
  - Registro com baixa automática de estoque.
  - Bloqueio de empréstimos para clientes/livros inativos ou sem estoque.
  - Devolução com reposição automática de estoque e registro de timestamp (`pt-BR`).
- **📊 Relatórios Avançados (SQL JOINs):**
  1. Livros Disponíveis.
  2. Livros Emprestados Atualmente.
  3. Livros Cadastrados por Autor.
  4. Quantidade de Empréstimos por Livro.
  5. Clientes com Empréstimos Ativos.
- **🛡️ Tratamento de Erros:** Exceções isoladas impedem o travamento da aplicação, exibindo alertas visuais padronizados (`❌ Erro:`).

## 💡 Exemplo de Utilização

Ao iniciar a aplicação, você será recebido pela tela de autenticação:

```text
==================================================
    Bem-vindo ao Acervo CLI
    Sistema de Gestão de Biblioteca
==================================================

Informe os dados do usuário
? login: admin
? senha: [hidden]

✅ Login realizado com sucesso!

==============================
    BOOKSTORE MANAGER CLI
==============================
1. Gerenciar Autores
2. Gerenciar Livros
3. Gerenciar Clientes
4. Gerenciar Empréstimos
5. Relatórios
0. Encerrar Aplicação

Escolha uma opção:
```

## 🚀 Melhorias Futuras

- **Evolução para API RESTful:** Migrar a interface de terminal para uma API HTTP (Express/NestJS) para consumo via Front-End.
- **ORM:** Substituir as queries SQL puras pelo `Prisma` ou `TypeORM` para facilitar manutenções futuras e gerenciar _migrations_.
- **Sistema de Multas:** Lógica para aplicar taxas diárias a devoluções atrasadas.
- **Testes Automatizados:** Implementação de testes unitários com `Jest` nos _Services_.
