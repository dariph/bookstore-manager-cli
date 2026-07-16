import { pool } from "../database/connection.js";
import type { Emprestimo, EmprestimoRelatorio } from "../models/types.js";

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

  async listar(): Promise<EmprestimoRelatorio[]> {
    const query = `
      SELECT e.id, l.titulo as livro, c.nome as cliente, e.data_emprestimo, e.data_devolucao, e.status
      FROM emprestimos e
      INNER JOIN livros l ON e.livro_id = l.id
      INNER JOIN clientes c ON e.cliente_id = c.id
      ORDER BY e.data_emprestimo DESC;
    `;
    const res = await pool.query<EmprestimoRelatorio>(query);
    return res.rows;
  }

  async devolver(emprestimoId: number): Promise<void> {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const res = await client.query<{ livro_id: number }>(
        "SELECT livro_id FROM emprestimos WHERE id = $1 AND status = $2",
        [emprestimoId, "ATIVO"],
      );
      if (res.rowCount === 0)
        throw new Error("Empréstimo não encontrado ou já devolvido.");

      const primeiraLinha = res.rows[0];
      if (!primeiraLinha) {
        throw new Error("Linha não encontrada no banco de dados.");
      }
      const livroId = primeiraLinha.livro_id;

      await client.query(
        "UPDATE emprestimos SET status = 'DEVOLVIDO', data_devolucao = CURRENT_TIMESTAMP WHERE id = $1",
        [emprestimoId],
      );

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
