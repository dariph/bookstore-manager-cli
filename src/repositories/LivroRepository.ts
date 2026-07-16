import { pool } from "../database/connection.js";
import type { Livro, LivroDetalhado } from "../models/types.js";

export class LivroRepository {
  async criar(livro: Livro): Promise<void> {
    await pool.query(
      "INSERT INTO livros (titulo, autor_id, quantidade_disponivel) VALUES ($1, $2, $3)",
      [livro.titulo, livro.autor_id, livro.quantidade_disponivel],
    );
  }

  async listar(limite = 10, offset = 0): Promise<LivroDetalhado[]> {
    const query = `
      SELECT l.id, l.titulo, a.nome AS autor, l.quantidade_disponivel 
      FROM livros l 
      INNER JOIN autores a ON l.autor_id = a.id
      WHERE l.ativo = TRUE
      ORDER BY l.id ASC
      LIMIT $1 OFFSET $2
    `;
    const res = await pool.query<LivroDetalhado>(query, [limite, offset]);
    return res.rows;
  }

  async buscarPorId(id: number): Promise<Livro | null> {
    const res = await pool.query<Livro>(
      "SELECT * FROM livros WHERE id = $1 AND ativo = TRUE",
      [id],
    );
    return res.rows[0] ?? null;
  }

  async atualizar(id: number, livro: Livro): Promise<void> {
    await pool.query(
      "UPDATE livros SET titulo = $1, autor_id = $2, quantidade_disponivel = $3 WHERE id = $4",
      [livro.titulo, livro.autor_id, livro.quantidade_disponivel, id],
    );
  }

  async remover(id: number): Promise<void> {
    await pool.query("UPDATE livros SET ativo = FALSE WHERE id = $1", [id]);
  }
}
