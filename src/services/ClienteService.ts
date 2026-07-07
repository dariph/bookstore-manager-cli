import { ClienteRepository } from "../repositories/ClienteRepository";

export class ClienteService {
  private clienteRepo = new ClienteRepository();

  async cadastrar(nome: string, email: string): Promise<void> {
    if (!nome || !email) throw new Error("Nome e email são obrigatórios.");

    const clienteExistente = await this.clienteRepo.buscarPorEmail(email);
    if (clienteExistente)
      throw new Error("Já existe um cliente cadastrado com este email.");

    await this.clienteRepo.criar({ nome, email });
  }

  async listarTodos(): Promise<any[]> {
    return await this.clienteRepo.listar();
  }
}
