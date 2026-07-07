import { AutorRepository } from "../repositories/AutorRepository";
import { Autor } from "../models/types";

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

  async remover(id: number): Promise<void> {
    await this.consultarPorId(id); // Valida se existe
    await this.autorRepo.remover(id);
  }
}
