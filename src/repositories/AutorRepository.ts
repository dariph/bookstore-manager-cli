import { pool } from "../database/connection";
import { Autor } from "../models/types";

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
    return res.rowCount > 0 ? res.rows[0] : null;
  }

  async remover(id: number): Promise<void> {
    // A restrição ON DELETE RESTRICT no banco impedirá a exclusão se houver livros vinculados
    await pool.query("DELETE FROM autores WHERE id = $1", [id]);
  }
}
