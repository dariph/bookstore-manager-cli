import { LivroRepository } from "../repositories/LivroRepository.js";
import { AutorRepository } from "../repositories/AutorRepository.js";
import type { Livro } from "../models/types.js";

export class LivroService {
  private livroRepo = new LivroRepository();
  private autorRepo = new AutorRepository();

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

  async remover(id: number): Promise<void> {
    const livro = await this.livroRepo.buscarPorId(id);
    if (!livro) throw new Error("Livro não encontrado.");
    await this.livroRepo.remover(id);
  }
}
