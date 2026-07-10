import { EmprestimoService } from "../services/EmprestimoService.js";
import { askQuestion } from "../utils/cli.js";

export class EmprestimoController {
  private service = new EmprestimoService();

  async menu(): Promise<void> {
    let rodando = true;

    while (rodando) {
      console.log("\n--- MENU DE EMPRÉSTIMOS ---");
      console.log("1. Registrar Empréstimo");
      console.log("2. Registrar Devolução");
      console.log("3. Consultar Histórico de Empréstimos");
      console.log("0. Voltar ao Menu Principal");

      const opcao = await askQuestion("Escolha uma opção: ");

      try {
        if (opcao === "1") {
          const livroId = parseInt(await askQuestion("ID do Livro: "));
          const clienteId = parseInt(await askQuestion("ID do Cliente: "));
          await this.service.registrarEmprestimo(livroId, clienteId);
          console.log("✅ Empréstimo registrado com sucesso!");
        } else if (opcao === "2") {
          const emprestimoId = parseInt(
            await askQuestion("ID do Empréstimo: "),
          );
          await this.service.registrarDevolucao(emprestimoId);
          console.log("✅ Devolução registrada com sucesso!");
        } else if (opcao === "3") {
          const emprestimos = await this.service.listarTodos();

          const emprestimosFormatados = emprestimos.map((emp: any) => ({
            ...emp,
            data_emprestimo: emp.data_emprestimo
              ? new Date(emp.data_emprestimo).toLocaleString("pt-BR", {
                  timeZone: "America/Sao_Paulo",
                })
              : null,
            data_devolucao: emp.data_devolucao
              ? new Date(emp.data_devolucao).toLocaleString("pt-BR", {
                  timeZone: "America/Sao_Paulo",
                })
              : null,
          }));

          console.table(emprestimosFormatados);
        } else if (opcao === "0") {
          rodando = false;
        } else {
          console.log("Opção inválida.");
        }
      } catch (error: any) {
        console.error("❌ Erro:", error.message);
      }
    }
  }
}
