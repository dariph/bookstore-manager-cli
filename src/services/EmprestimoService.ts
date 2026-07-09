import { EmprestimoRepository } from "../repositories/EmprestimoRepository.js";
import { pool } from "../database/connection.js";

export class EmprestimoService {
  private emprestimoRepo = new EmprestimoRepository();

  async registrarEmprestimo(
    livro_id: number,
    cliente_id: number,
  ): Promise<void> {
    const resLivro = await pool.query(
      "SELECT quantidade_disponivel FROM livros WHERE id = $1",
      [livro_id],
    );
    if (resLivro.rowCount === 0) throw new Error("Livro inexistente.");
    if (resLivro.rows[0].quantidade_disponivel <= 0)
      throw new Error("Livro sem disponibilidade de estoque.");

    const resCliente = await pool.query(
      "SELECT id FROM clientes WHERE id = $1",
      [cliente_id],
    );
    if (resCliente.rowCount === 0) throw new Error("Cliente inexistente.");

    await this.emprestimoRepo.criar({ livro_id, cliente_id });
  }

  async registrarDevolucao(emprestimo_id: number): Promise<void> {
    await this.emprestimoRepo.devolver(emprestimo_id);
  }

  async listarTodos(): Promise<any[]> {
    return await this.emprestimoRepo.listar();
  }
}
