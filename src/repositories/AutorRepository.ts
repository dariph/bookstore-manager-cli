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
    const res = await pool.query<Autor>(
      "SELECT * FROM autores WHERE ativo = TRUE ORDER BY id ASC",
    );
    return res.rows;
  }

  async buscarPorId(id: number): Promise<Autor | null> {
    const res = await pool.query<Autor>(
      "SELECT * FROM autores WHERE id = $1 AND ativo = TRUE",
      [id],
    );
    return res.rows[0] ?? null;
  }

  async atualizar(id: number, autor: Autor): Promise<void> {
    await pool.query(
      "UPDATE autores SET nome = $1, nacionalidade = $2 WHERE id = $3",
      [autor.nome, autor.nacionalidade, id],
    );
  }

  async remover(id: number): Promise<void> {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      await client.query("UPDATE autores SET ativo = FALSE WHERE id = $1", [
        id,
      ]);

      await client.query(
        "UPDATE livros SET ativo = FALSE WHERE autor_id = $1",
        [id],
      );

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}
