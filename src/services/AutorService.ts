import { AutorRepository } from "../repositories/AutorRepository.js";
import type { Autor } from "../models/types.js";

export class AutorService {
  private autorRepo = new AutorRepository();

  async cadastrar(nome: string, nacionalidade: string): Promise<void> {
    if (!nome || !nacionalidade)
      throw new Error("Nome e nacionalidade são obrigatórios.");
    await this.autorRepo.criar({ nome, nacionalidade });
  }

  async listarTodos(): Promise<Autor[]> {
    return await this.autorRepo.listar();
  }

  async consultarPorId(id: number): Promise<Autor> {
    const autor = await this.autorRepo.buscarPorId(id);
    if (!autor) throw new Error("Autor não encontrado.");
    return autor;
  }

  async atualizar(
    id: number,
    nome: string,
    nacionalidade: string,
  ): Promise<void> {
    if (!nome || !nacionalidade)
      throw new Error("Nome e nacionalidade são obrigatórios.");

    await this.consultarPorId(id);
    await this.autorRepo.atualizar(id, { nome, nacionalidade });
  }

  async remover(id: number): Promise<void> {
    await this.consultarPorId(id);
    await this.autorRepo.remover(id);
  }
}
