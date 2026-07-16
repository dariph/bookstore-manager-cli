import type { Cliente, ClienteListagem } from "../models/types.js";
import { ClienteRepository } from "../repositories/ClienteRepository.js";

export class ClienteService {
  constructor(private clienteRepo: ClienteRepository) {}

  async cadastrar(nome: string, email: string): Promise<void> {
    if (!nome || !email) throw new Error("Nome e email são obrigatórios.");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new Error("Formato de e-mail inválido.");

    const clienteExistente = await this.clienteRepo.buscarPorEmail(email);
    if (clienteExistente)
      throw new Error("Já existe um cliente cadastrado com este email.");
    await this.clienteRepo.criar({ nome, email });
  }

  async listarTodos(): Promise<ClienteListagem[]> {
    return await this.clienteRepo.listar();
  }

  async consultarPorId(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepo.buscarPorId(id);
    if (!cliente) throw new Error("Cliente não encontrado.");
    return cliente;
  }

  async atualizar(id: number, nome: string, email: string): Promise<void> {
    if (!nome || !email) throw new Error("Nome e email são obrigatórios.");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new Error("Formato de e-mail inválido.");

    await this.consultarPorId(id);
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
