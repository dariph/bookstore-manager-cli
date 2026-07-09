import { pool } from "../database/connection.js";
import type { Autor } from "../models/types.js";

export class AutorRepository {
  async criar(autor: Autor): Promise<void> {
    await pool.query(
      "INSERT INTO autores (nome, nacionalidade) VALUES ($1, $2)",
      [autor.nome, autor.nacionalidade],
    );
  }

  async listar(): Promise<Autor[]> {
    const res = await pool.query("SELECT * FROM autores ORDER BY id ASC");
    return res.rows;
  }

  async buscarPorId(id: number): Promise<Autor | null> {
    const res = await pool.query("SELECT * FROM autores WHERE id = $1", [id]);
    return res.rows.length > 0 ? res.rows[0] : null;
  }

  async atualizar(id: number, autor: Autor): Promise<void> {
    await pool.query(
      "UPDATE autores SET nome = $1, nacionalidade = $2 WHERE id = $3",
      [autor.nome, autor.nacionalidade, id],
    );
  }

  async remover(id: number): Promise<void> {
    await pool.query("DELETE FROM autores WHERE id = $1", [id]);
  }
}
