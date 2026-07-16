import { LivroService } from "../services/LivroService.js";
import { askQuestion } from "../utils/cli.js";

export class LivroController {
  constructor(private readonly livroService: LivroService) {}

  async menu(): Promise<void> {
    let rodando = true;
    while (rodando) {
      console.log("\n--- GERENCIAR LIVROS ---");
      console.log("1. Cadastrar Livro");
      console.log("2. Listar Livros");
      console.log("3. Consultar Livro por ID");
      console.log("4. Atualizar Livro");
      console.log("5. Inativar Livro");
      console.log("0. Voltar ao Menu Principal");

      const opcao = await askQuestion("Escolha uma opção: ");

      try {
        if (opcao === "1") {
          const titulo = await askQuestion("Título: ");
          const autorId = parseInt(await askQuestion("ID do Autor: "));
          const quantidade = parseInt(
            await askQuestion("Quantidade disponível: "),
          );
          await this.livroService.cadastrar(titulo, autorId, quantidade);
          console.log("✅ Livro cadastrado com sucesso!");
        } else if (opcao === "2") {
          const limite = 10;
          const paginaInput = await askQuestion(
            "Página desejada (pressione ENTER para a página 1): ",
          );
          const pagina = parseInt(paginaInput) || 1;
          const offset = (pagina - 1) * limite;

          const livros = await this.livroService.listarTodos(limite, offset);

          if (livros.length === 0) {
            console.log("\n⚠️ Nenhum livro encontrado nesta página.");
          } else {
            console.log(`\n--- Exibindo Livros (Página ${String(pagina)}) ---`);
            console.table(livros);
          }
        } else if (opcao === "3") {
          const idBusca = parseInt(await askQuestion("ID do livro: "));
          console.table([await this.livroService.consultarPorId(idBusca)]);
        } else if (opcao === "4") {
          const idAtualizar = parseInt(
            await askQuestion("ID do livro para atualizar: "),
          );
          const titulo = await askQuestion("Novo título: ");
          const autorId = parseInt(await askQuestion("Novo ID do Autor: "));
          const quantidade = parseInt(
            await askQuestion("Nova quantidade disponível: "),
          );
          await this.livroService.atualizar(
            idAtualizar,
            titulo,
            autorId,
            quantidade,
          );
          console.log("✅ Livro atualizado com sucesso!");
        } else if (opcao === "5") {
          const idRemover = parseInt(
            await askQuestion("ID do livro para inativar: "),
          );
          await this.livroService.remover(idRemover);
          console.log("✅ Livro inativado com sucesso!");
        } else if (opcao === "0") {
          rodando = false;
        } else {
          console.log("Opção inválida.");
        }
      } catch (error: unknown) {
        const mensagem = error instanceof Error ? error.message : String(error);
        console.error("❌ Erro:", mensagem);
      }
    }
  }
}
