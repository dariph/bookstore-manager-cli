-- Active: 1783434220306@@127.0.0.1@5432@bookstore_db
CREATE DATABASE bookstore;

CREATE TABLE autores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    nacionalidade VARCHAR(100)
);

CREATE TABLE livros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    autor_id INTEGER REFERENCES autores (id) ON DELETE RESTRICT,
    quantidade_disponivel INTEGER NOT NULL CHECK (quantidade_disponivel >= 0)
);

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE emprestimos (
    id SERIAL PRIMARY KEY,
    livro_id INTEGER REFERENCES livros (id) ON DELETE RESTRICT,
    cliente_id INTEGER REFERENCES clientes (id) ON DELETE RESTRICT,
    data_emprestimo DATE DEFAULT CURRENT_DATE,
    data_devolucao DATE,
    status VARCHAR(20) DEFAULT 'ATIVO'
);