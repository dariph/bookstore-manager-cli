import type { Cliente } from "../models/types.js";
import { ClienteRepository } from "../repositories/ClienteRepository.js";

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

  async consultarPorId(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepo.buscarPorId(id);
    if (!cliente) throw new Error("Cliente não encontrado.");
    return cliente;
  }

  async atualizar(id: number, nome: string, email: string): Promise<void> {
    if (!nome || !email) throw new Error("Nome e email são obrigatórios.");
    await this.consultarPorId(id); // Valida se existe

    const clienteExistente = await this.clienteRepo.buscarPorEmail(email);
    if (clienteExistente && clienteExistente.id !== id) {
      throw new Error("Já existe outro cliente cadastrado com este email.");
    }

    await this.clienteRepo.atualizar(id, { nome, email });
  }

  async remover(id: number): Promise<void> {
    await this.consultarPorId(id);
    await this.clienteRepo.remover(id);
  }
}
