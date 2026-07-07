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
}
