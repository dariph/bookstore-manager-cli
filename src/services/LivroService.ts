import { LivroRepository } from "../repositories/LivroRepository.js";
import { AutorRepository } from "../repositories/AutorRepository.js";
import type { Livro } from "../models/types.js";

export class LivroService {
  private livroRepo = new LivroRepository();
  private autorRepo = new AutorRepository();
  private repository = new LivroRepository();

  async cadastrar(
    titulo: string,
    autor_id: number,
    quantidade: number,
  ): Promise<void> {
    if (!titulo || quantidade < 0)
      throw new Error("Dados inválidos para o livro.");

    const autorExiste = await this.autorRepo.buscarPorId(autor_id);
    if (!autorExiste)
      throw new Error("Autor inexistente. Não é possível cadastrar o livro.");

    await this.livroRepo.criar({
      titulo,
      autor_id,
      quantidade_disponivel: quantidade,
    });
  }

  async listarTodos(): Promise<any[]> {
    return await this.livroRepo.listar();
  }

  async consultarPorId(id: number): Promise<Livro> {
    const livro = await this.livroRepo.buscarPorId(id);
    if (!livro) throw new Error("Livro não encontrado.");
    return livro;
  }

  async atualizar(
    id: number,
    titulo: string,
    autor_id: number,
    quantidade: number,
  ): Promise<void> {
    if (!titulo || quantidade < 0)
      throw new Error("Dados inválidos para o livro.");
    await this.consultarPorId(id);

    const autorExiste = await this.autorRepo.buscarPorId(autor_id);
    if (!autorExiste)
      throw new Error("Autor inexistente. Não é possível atualizar.");

    await this.livroRepo.atualizar(id, {
      titulo,
      autor_id,
      quantidade_disponivel: quantidade,
    });
  }

  async remover(id: number, quantidadeParaRemover: number): Promise<void> {
    const livro = await this.repository.buscarPorId(id);

    if (!livro) {
      throw new Error("Livro não encontrado.");
    }

    if (quantidadeParaRemover > livro.quantidade_disponivel) {
      throw new Error("A quantidade a remover é maior do que o estoque atual.");
    }

    const novaQuantidade = livro.quantidade_disponivel - quantidadeParaRemover;

    if (novaQuantidade === 0) {
      await this.repository.remover(id);
    } else {
      livro.quantidade_disponivel = novaQuantidade;
      await this.repository.atualizar(id, livro);
    }
  }
}
