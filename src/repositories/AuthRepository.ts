import { pool } from "../database/connection.js";
import type { Usuario } from "../models/types.js";

export class AuthRepository {
  async buscarPorLogin(login: string): Promise<Usuario | null> {
    const res = await pool.query("SELECT * FROM usuarios WHERE login = $1", [
      login,
    ]);
    return res.rows.length > 0 ? res.rows[0] : null;
  }
}
