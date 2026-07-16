import { pool } from "../database/connection.js";
import type { Cliente, ClienteListagem } from "../models/types.js";

export class ClienteRepository {
  async criar(cliente: Cliente): Promise<Cliente> {
    const res = await pool.query<Cliente>(
      "INSERT INTO clientes (nome, email) VALUES ($1, $2) RETURNING *",
      [cliente.nome, cliente.email],
    );

    const novoCliente = res.rows[0];

    if (!novoCliente) {
      throw new Error(
        "Falha ao criar o cliente. Nenhum dado retornado do banco.",
      );
    }

    return novoCliente;
  }

  async listar(): Promise<ClienteListagem[]> {
    const res = await pool.query<ClienteListagem>(
      "SELECT * FROM clientes WHERE ativo = TRUE ORDER BY id ASC",
    );
    return res.rows;
  }

  async buscarPorEmail(email: string): Promise<Cliente | null> {
    const res = await pool.query<Cliente>(
      "SELECT * FROM clientes WHERE email = $1 AND ativo = TRUE",
      [email],
    );
    return res.rows[0] ?? null;
  }

  async buscarPorId(id: number): Promise<Cliente | null> {
    const res = await pool.query<Cliente>(
      "SELECT * FROM clientes WHERE id = $1 AND ativo = TRUE",
      [id],
    );
    return res.rows[0] ?? null;
  }

  async atualizar(id: number, cliente: Cliente): Promise<void> {
    await pool.query(
      "UPDATE clientes SET nome = $1, email = $2 WHERE id = $3",
      [cliente.nome, cliente.email, id],
    );
  }

  async remover(id: number): Promise<void> {
    await pool.query("UPDATE clientes SET ativo = FALSE WHERE id = $1", [id]);
  }
}
