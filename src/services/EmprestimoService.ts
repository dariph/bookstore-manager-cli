import { pool } from "../database/connection.js";
import type { EmprestimoRelatorio } from "../models/types.js";
import { EmprestimoRepository } from "../repositories/EmprestimoRepository.js";

export class EmprestimoService {
  constructor(private readonly emprestimoRepo: EmprestimoRepository) {}

  async registrarEmprestimo(
    livro_id: number,
    cliente_id: number,
  ): Promise<void> {
    const resLivro = await pool.query<{
      quantidade_disponivel: number;
      ativo: boolean;
    }>("SELECT quantidade_disponivel, ativo FROM livros WHERE id = $1", [
      livro_id,
    ]);

    const livro = resLivro.rows[0];

    if (!livro) {
      throw new Error("Livro inexistente.");
    }
    if (!livro.ativo) {
      throw new Error("Este livro foi inativado e não pode ser emprestado.");
    }
    if (livro.quantidade_disponivel <= 0) {
      throw new Error("Livro sem disponibilidade de estoque.");
    }

    const resCliente = await pool.query<{ ativo: boolean }>(
      "SELECT ativo FROM clientes WHERE id = $1",
      [cliente_id],
    );

    const cliente = resCliente.rows[0];

    if (!cliente) {
      throw new Error("Cliente inexistente.");
    }
    if (!cliente.ativo) {
      throw new Error("Este cliente está inativado no sistema.");
    }

    await this.emprestimoRepo.criar({ livro_id, cliente_id });
  }

  async registrarDevolucao(emprestimo_id: number): Promise<void> {
    await this.emprestimoRepo.devolver(emprestimo_id);
  }

  async listarTodos(): Promise<EmprestimoRelatorio[]> {
    return this.emprestimoRepo.listar();
  }
}
