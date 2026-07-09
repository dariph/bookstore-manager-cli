import { pool } from "./database/connection.js";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";

dotenv.config();

async function criarAdmin() {
  try {
    console.log("Iniciando a criação do usuário admin...");

    const login = process.env.ADMIN_LOGIN;
    const senha = process.env.ADMIN_PASSWORD;

    if (!login || !senha) {
      throw new Error(
        "As variáveis ADMIN_LOGIN e ADMIN_PASSWORD não foram encontradas no arquivo .env",
      );
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    await pool.query(
      `INSERT INTO usuarios (login, senha) 
       VALUES ($1, $2) 
       ON CONFLICT (login) DO UPDATE SET senha = $2`,
      [login, senhaHash],
    );

    console.log(`✅ Usuário '${login}' criado/atualizado com sucesso!`);
  } catch (error: any) {
    console.error("❌ Erro ao criar usuário no banco:", error.message);
  } finally {
    process.exit(0);
  }
}

criarAdmin();
