import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";

import { pool } from "./database/connection.js";

dotenv.config();

async function criarAdmin() {
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
}

criarAdmin()
  .then(() => {
    process.exit(0);
  })
  .catch((error: unknown) => {
    const mensagem = error instanceof Error ? error.message : String(error);
    console.error("❌ Erro ao criar usuário no banco:", mensagem);

    process.exit(1);
  });
