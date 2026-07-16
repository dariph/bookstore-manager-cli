import type { EmprestimoRelatorio } from "../models/types.js";
import { EmprestimoService } from "../services/EmprestimoService.js";
import { askQuestion } from "../utils/cli.js";
import { formatarDataBR } from "../utils/formatters.js";

export class EmprestimoController {
  constructor(private readonly emprestimoService: EmprestimoService) {}

  async menu(): Promise<void> {
    let rodando = true;

    while (rodando) {
      console.log("\n--- MENU DE EMPRÉSTIMOS ---");
      console.log("1. Registrar Empréstimo");
      console.log("2. Devolver Livro");
      console.log("3. Listar Empréstimos");
      console.log("0. Voltar ao Menu Principal");

      const opcao = await askQuestion("Escolha uma opção: ");

      try {
        if (opcao === "1") {
          const livroId = parseInt(await askQuestion("ID do Livro: "));
          const clienteId = parseInt(await askQuestion("ID do Cliente: "));

          if (isNaN(livroId) || isNaN(clienteId)) {
            throw new Error(
              "Os IDs do livro e do cliente devem ser números válidos.",
            );
          }

          await this.emprestimoService.registrarEmprestimo(livroId, clienteId);
          console.log("✅ Empréstimo registrado com sucesso!");
        } else if (opcao === "2") {
          const emprestimoId = parseInt(
            await askQuestion("ID do Empréstimo: "),
          );

          if (isNaN(emprestimoId)) {
            throw new Error("O ID do empréstimo deve ser um número válido.");
          }

          await this.emprestimoService.registrarDevolucao(emprestimoId);
          console.log("✅ Devolução registrada com sucesso!");
        } else if (opcao === "3") {
          const emprestimos = await this.emprestimoService.listarTodos();

          const emprestimosFormatados = emprestimos.map(
            (emp: EmprestimoRelatorio) => ({
              ...emp,
              data_emprestimo: emp.data_emprestimo
                ? formatarDataBR(emp.data_emprestimo)
                : null,
              data_devolucao: emp.data_devolucao
                ? formatarDataBR(emp.data_devolucao)
                : null,
            }),
          );

          console.table(emprestimosFormatados);
        } else if (opcao === "0") {
          rodando = false;
        } else {
          console.log("Opção inválida. Tente novamente.");
        }
      } catch (error: unknown) {
        const mensagem = error instanceof Error ? error.message : String(error);
        console.error("❌ Erro:", mensagem);
      }
    }
  }
}
