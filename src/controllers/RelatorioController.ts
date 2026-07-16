import { RelatorioRepository } from "../repositories/RelatorioRepository.js";
import { askQuestion } from "../utils/cli.js";

export class RelatorioController {
  constructor(private readonly relatorioRepo: RelatorioRepository) {}

  async menu(): Promise<void> {
    let rodando = true;
    while (rodando) {
      console.log("\n--- RELATÓRIOS ---");
      console.log("1. Livros Disponíveis");
      console.log("2. Livros Emprestados");
      console.log("3. Livros Cadastrados por Autor");
      console.log("4. Quantidade de Empréstimos por Livro");
      console.log("5. Clientes com Empréstimos Ativos");
      console.log("0. Voltar ao Menu Principal");

      const opcao = await askQuestion("Escolha uma opção: ");

      try {
        if (opcao === "1") {
          console.table(await this.relatorioRepo.listarLivrosDisponiveis());
        } else if (opcao === "2") {
          console.table(await this.relatorioRepo.listarLivrosEmprestados());
        } else if (opcao === "3") {
          console.table(await this.relatorioRepo.listarLivrosPorAutor());
        } else if (opcao === "4") {
          console.table(
            await this.relatorioRepo.listarQuantidadeEmprestimosPorLivro(),
          );
        } else if (opcao === "5") {
          console.table(
            await this.relatorioRepo.listarClientesComEmprestimosAtivos(),
          );
        } else if (opcao === "0") {
          rodando = false;
        } else {
          console.log("Opção inválida.");
        }
      } catch (error: unknown) {
        const mensagem = error instanceof Error ? error.message : String(error);
        console.error("❌ Erro ao gerar relatório:", mensagem);
      }
    }
  }
}
