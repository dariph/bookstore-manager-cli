import { pool } from "../database/connection.js";
import type { Cliente } from "../models/types.js";

export class ClienteRepository {
  async criar(cliente: Cliente): Promise<void> {
    await pool.query("INSERT INTO clientes (nome, email) VALUES ($1, $2)", [
      cliente.nome,
      cliente.email,
    ]);
  }

  async listar(): Promise<Cliente[]> {
    const res = await pool.query("SELECT * FROM clientes ORDER BY id ASC");
    return res.rows;
  }

  async buscarPorEmail(email: string): Promise<Cliente | null> {
    const res = await pool.query("SELECT * FROM clientes WHERE email = $1", [
      email,
    ]);
    return res.rows.length > 0 ? res.rows[0] : null;
  }

  async buscarPorId(id: number): Promise<Cliente | null> {
    const res = await pool.query("SELECT * FROM clientes WHERE id = $1", [id]);
    return res.rows.length > 0 ? res.rows[0] : null;
  }

  async atualizar(id: number, cliente: Cliente): Promise<void> {
    await pool.query(
      "UPDATE clientes SET nome = $1, email = $2 WHERE id = $3",
      [cliente.nome, cliente.email, id],
    );
  }

  async remover(id: number): Promise<void> {
    await pool.query("DELETE FROM clientes WHERE id = $1", [id]);
  }
}
