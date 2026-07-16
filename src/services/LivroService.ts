import type { Livro, LivroDetalhado } from "../models/types.js";
import { AutorRepository } from "../repositories/AutorRepository.js";
import { LivroRepository } from "../repositories/LivroRepository.js";

export class LivroService {
  constructor(
    private livroRepo: LivroRepository,
    private autorRepo: AutorRepository,
  ) {}

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

  async listarTodos(limite = 10, offset = 0): Promise<LivroDetalhado[]> {
    return await this.livroRepo.listar(limite, offset);
  }

  async consultarPorId(id: number): Promise<Livro> {
    const livro = await this.livroRepo.buscarPorId(id);
    if (!livro) throw new Error("Livro não encontrado ou inativado.");
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
    await this.consultarPorId(id);
    await this.livroRepo.remover(id);
  }
}
