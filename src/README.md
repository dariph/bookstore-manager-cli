# BookStore Manager CLI 📚

O **BookStore Manager CLI** é uma aplicação executada via terminal (Command Line Interface - CLI) desenvolvida para o gerenciamento de uma pequena livraria.
O sistema permite o controle completo e persistente de autores, livros, clientes e empréstimos.

## 🎯 Objetivo

Substituir os registros manuais da livraria por uma aplicação informatizada, garantindo a integridade dos dados, aplicando regras de negócio consistentes (como validação de estoque durante empréstimos) e gerando relatórios precisos a partir de um banco de dados relacional.

## 🚀 Tecnologias Utilizadas

- **Back-End:** Node.js
- **Linguagem:** TypeScript
- **Banco de Dados:** PostgreSQL
- **Bibliotecas principais:** `pg` (node-postgres) para conexão direta com o banco e comandos SQL, e `dotenv` para gerenciamento de variáveis de ambiente.

## ⚙️ Requisitos para Execução

- **Node.js** (versão 16.x ou superior)
- **PostgreSQL** (versão 13.x ou superior) instalado e rodando localmente ou em nuvem.
- **Git** para versionamento e clonagem do repositório.

## 🛠️ Configuração do Banco de Dados

1. Acesse o seu SGBD PostgreSQL (via pgAdmin, DBeaver ou psql).

2. Execute o script de criação localizado em `src/database/schema.sql`. Este script irá:
   - Criar o banco de dados `bookstore`.
   - Criar as tabelas normalizadas (`autores`, `livros`, `clientes`, `emprestimos`) com suas respectivas chaves primárias e estrangeiras.

3. Na raiz do projeto, crie um arquivo chamado `.env` e configure as credenciais de acesso ao seu banco de dados local:
   DB_USER=seu_usuario_postgres
   DB_PASSWORD=sua_senha
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=bookstore

💻 Instalação
Clone este repositório e instale as dependências do projeto:

_Terminal/Bash_
git clone https://github.com/dariph/bookstore-manager-cli.git
cd bookstore-manager-cli
npm install

▶️ Execução
Para rodar o projeto em ambiente de desenvolvimento (utilizando ts-node):

_Terminal/Bash_
npm run dev
Para compilar o código TypeScript para JavaScript e executar a versão de produção:

_Terminal/Bash_
npm run build
npm start

🏗️ Arquitetura do Projeto
O sistema foi desenvolvido utilizando o padrão de Arquitetura em Camadas (Clean Architecture e SOLID), garantindo a separação clara de responsabilidades e facilitando a manutenção e escalabilidade do código:

CLI (Menu): Ponto de entrada iterativo (main.ts).

Controllers: Gerenciam a interação com o usuário via terminal (entradas e saídas).

Services: Contêm todas as regras de negócio e validações lógicas (ex: verificação de estoque antes de um empréstimo).

Repositories: Camada exclusiva para comunicação com o PostgreSQL, executando queries SQL puras.

Models: Interfaces e tipos estáticos do TypeScript que representam as entidades.

📁 Estrutura de Pastas
Plaintext
📦 bookstore-manager-cli
┣ 📂 src
┃ ┣ 📂 controllers # Controladores dos menus de interação
┃ ┣ 📂 database # Conexão (connection.ts) e scripts SQL (schema.sql)
┃ ┣ 📂 models # Interfaces TypeScript (types.ts)
┃ ┣ 📂 repositories # Comunicação direta com o banco de dados via pg
┃ ┣ 📂 services # Lógica e validações de regras de negócio
┃ ┣ 📂 utils # Funções utilitárias auxiliares (ex: cli.ts)
┃ ┗ 📜 main.ts # Arquivo principal e inicializador da aplicação
┣ 📜 .env # Variáveis de ambiente
┣ 📜 .gitignore # Arquivos ignorados pelo Git
┣ 📜 package.json # Dependências e scripts de execução
┣ 📜 tsconfig.json # Configurações do compilador TypeScript
┗ 📜 README.md # Documentação oficial do projeto

✅ Funcionalidades Implementadas
Gerenciamento de Autores: Cadastro, listagem, consulta por ID e remoção.

Gerenciamento de Livros: Cadastro (vinculado a um autor), listagem e remoção.

Gerenciamento de Clientes: Cadastro (com e-mail único) e listagem.

Gerenciamento de Empréstimos:

Registro de empréstimos com baixa automática de estoque.

Validação de restrições (livros sem estoque ou entidades inexistentes).

Registro de devolução com reposição automática de estoque.

Relatórios (JOINs SQL):

Listagem de livros atualmente emprestados detalhando o cliente e data.

Quantidade total de empréstimos históricos por livro.

Tratamento de Erros: Exceções capturadas assincronamente (Try/Catch) exibindo mensagens amigáveis no terminal sem derrubar a aplicação.

💡 Exemplos de Utilização
Ao iniciar a aplicação rodando npm run dev, você verá o seguinte menu principal:

# Plaintext

    BOOKSTORE MANAGER CLI

==============================

1. Gerenciar Autores
2. Gerenciar Livros
3. Gerenciar Clientes
4. Gerenciar Empréstimos
5. Relatórios
6. Encerrar Aplicação

Escolha uma opção:
Navegando para a opção de Relatórios e listando livros emprestados:

Plaintext
--- RELATÓRIOS ---

1. Livros Emprestados Atualmente
2. Quantidade de Empréstimos por Livro
3. Voltar ao Menu Principal

Escolha uma opção: 1

| (index) | titulo         | cliente         | data_emprestimo          |
| ------- | -------------- | --------------- | ------------------------ |
| 0       | 'Código Limpo' | 'Dari Pinheiro' | 2026-07-06T03:00:00.000Z |

## 🚀 Melhorias Futuras

Este projeto foi construído com uma arquitetura escalável, o que permite a fácil implementação de novas funcionalidades no futuro. Algumas das melhorias planejadas incluem:

- **Evolução para API RESTful:** Migrar a interface CLI para uma API HTTP utilizando frameworks como Express ou NestJS, permitindo o consumo por aplicações Front-End ou Mobile.
- **Mapeamento Objeto-Relacional (ORM):** Substituir as queries SQL puras pela implementação do `Sequelize`, `Prisma` ou `TypeORM`, facilitando as migrações (migrations) e a manutenção do banco de dados.
- **Autenticação e Autorização:** Criar um sistema de login para os funcionários da livraria com controle de nível de acesso (ex: Administrador vs. Atendente), utilizando criptografia de senhas (Bcrypt) e tokens (JWT).
- **Testes Automatizados:** Implementar testes unitários e de integração utilizando `Jest`, garantindo que as regras de negócio cruciais (como a validação de estoque) não sejam quebradas durante futuras atualizações.
- **Sistema de Multas:** Adicionar lógica de negócio para calcular multas automaticamente em caso de devolução com atraso (após a data estipulada de vencimento).
- **Paginação e Filtros:** Implementar paginação nas listagens do terminal e opções de busca avançada (ex: filtrar livros por gênero ou autores por nacionalidade).
