import * as dotenv from "dotenv";
import { Pool } from "pg";
dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
});

export const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Conexão com o PostgreSQL estabelecida com sucesso!");
    client.release();
  } catch (error) {
    console.error("❌ Erro ao conectar ao banco de dados:", error);
    process.exit(1);
  }
};
