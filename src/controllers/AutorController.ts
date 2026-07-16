import { AutorService } from "../services/AutorService.js";
import { askQuestion } from "../utils/cli.js";

export class AutorController {
  constructor(private readonly autorService: AutorService) {}

  async menu(): Promise<void> {
    let rodando = true;
    while (rodando) {
      console.log("\n--- GERENCIAR AUTORES ---");
      console.log("1. Cadastrar Autor");
      console.log("2. Listar Autores");
      console.log("3. Consultar Autor por ID");
      console.log("4. Atualizar Autor");
      console.log("5. Inativar Autor");
      console.log("0. Voltar ao Menu Principal");

      const opcao = await askQuestion("Escolha uma opção: ");

      try {
        switch (opcao) {
          case "1": {
            const nome = await askQuestion("Nome do autor: ");
            const nacionalidade = await askQuestion("Nacionalidade: ");
            await this.autorService.cadastrar(nome, nacionalidade);
            console.log("✅ Autor cadastrado com sucesso!");
            break;
          }
          case "2": {
            console.table(await this.autorService.listarTodos());
            break;
          }
          case "3": {
            const idBusca = parseInt(await askQuestion("ID do autor: "));
            console.table([await this.autorService.consultarPorId(idBusca)]);
            break;
          }
          case "4": {
            const idAtualizar = parseInt(
              await askQuestion("ID do autor para atualizar: "),
            );
            const novoNome = await askQuestion("Novo nome: ");
            const novaNacionalidade = await askQuestion("Nova nacionalidade: ");
            await this.autorService.atualizar(
              idAtualizar,
              novoNome,
              novaNacionalidade,
            );
            console.log("✅ Autor atualizado com sucesso!");
            break;
          }
          case "5": {
            const idRemover = parseInt(
              await askQuestion("ID do autor para inativar: "),
            );
            await this.autorService.remover(idRemover);
            console.log("✅ Autor inativado com sucesso!");
            break;
          }
          case "0":
            rodando = false;
            break;
          default:
            console.log("Opção inválida.");
        }
      } catch (error: unknown) {
        const mensagem = error instanceof Error ? error.message : String(error);
        console.error("❌ Erro:", mensagem);
      }
    }
  }
}
