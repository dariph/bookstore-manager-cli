import { pool } from "../database/connection.js";
import type { Emprestimo } from "../models/types.js";

export class EmprestimoRepository {
  async criar(emprestimo: Emprestimo): Promise<void> {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      await client.query(
        "INSERT INTO emprestimos (livro_id, cliente_id) VALUES ($1, $2)",
        [emprestimo.livro_id, emprestimo.cliente_id],
      );

      await client.query(
        "UPDATE livros SET quantidade_disponivel = quantidade_disponivel - 1 WHERE id = $1",
        [emprestimo.livro_id],
      );
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async devolver(emprestimoId: number): Promise<void> {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      // Busca qual é o livro
      const res = await client.query(
        "SELECT livro_id FROM emprestimos WHERE id = $1 AND status = $2",
        [emprestimoId, "ATIVO"],
      );
      if (res.rowCount === 0)
        throw new Error("Empréstimo não encontrado ou já devolvido.");

      const livroId = res.rows[0].livro_id;

      // Marca como devolvido
      await client.query(
        "UPDATE emprestimos SET status = 'DEVOLVIDO', data_devolucao = CURRENT_DATE WHERE id = $1",
        [emprestimoId],
      );
      // Retorna ao estoque
      await client.query(
        "UPDATE livros SET quantidade_disponivel = quantidade_disponivel + 1 WHERE id = $1",
        [livroId],
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
