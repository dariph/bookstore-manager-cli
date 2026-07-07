import { pool } from "../database/connection";
import { Livro } from "../models/types";

export class LivroRepository {
  async criar(livro: Livro): Promise<void> {
    await pool.query(
      "INSERT INTO livros (titulo, autor_id, quantidade_disponivel) VALUES ($1, $2, $3)",
      [livro.titulo, livro.autor_id, livro.quantidade_disponivel],
    );
  }

  async listar(): Promise<any[]> {
    // Exemplo de JOIN para já trazer o nome do autor na listagem de livros
    const query = `
            SELECT l.id, l.titulo, a.nome AS autor, l.quantidade_disponivel 
            FROM livros l 
            INNER JOIN autores a ON l.autor_id = a.id
            ORDER BY l.id ASC
        `;
    const res = await pool.query(query);
    return res.rows;
  }

  async buscarPorId(id: number): Promise<Livro | null> {
    const res = await pool.query("SELECT * FROM livros WHERE id = $1", [id]);
    return res.rowCount > 0 ? res.rows[0] : null;
  }

  async remover(id: number): Promise<void> {
    await pool.query("DELETE FROM livros WHERE id = $1", [id]);
  }
}
