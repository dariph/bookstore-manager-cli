import { testConnection } from "./database/connection.js";
import { closeCLI, askQuestion } from "./utils/cli.js";
import { AutorController } from "./controllers/AutorController.js";
import { LivroController } from "./controllers/LivroController.js";
import { ClienteController } from "./controllers/ClienteController.js";
import { EmprestimoController } from "./controllers/EmprestimoController.js";
import { RelatorioController } from "./controllers/RelatorioController.js";
import { AuthController } from "./controllers/AuthController.js";

async function start() {
  await testConnection();

  const authController = new AuthController();
  const acessoLiberado = await authController.iniciarLogin();

  if (!acessoLiberado) {
    closeCLI();
    process.exit(1);
  }

  const autorController = new AutorController();
  const livroController = new LivroController();
  const clienteController = new ClienteController();
  const emprestimoController = new EmprestimoController();
  const relatorioController = new RelatorioController();

  let rodando = true;
  while (rodando) {
    console.log("\n==============================");
    console.log("    BOOKSTORE MANAGER CLI");
    console.log("==============================");
    console.log("1. Gerenciar Autores");
    console.log("2. Gerenciar Livros");
    console.log("3. Gerenciar Clientes");
    console.log("4. Gerenciar Empréstimos");
    console.log("5. Relatórios");
    console.log("0. Encerrar Aplicação");

    const opcao = await askQuestion("\nEscolha uma opção: ");

    switch (opcao) {
      case "1":
        await autorController.menu();
        break;
      case "2":
        await livroController.menu();
        break;
      case "3":
        await clienteController.menu();
        break;
      case "4":
        await emprestimoController.menu();
        break;
      case "5":
        await relatorioController.menu();
        break;
      case "0":
        console.log("Encerrando aplicação e conexões com o banco de dados...");
        rodando = false;
        break;
      default:
        console.log("Opção inválida. Tente novamente.");
    }
  }
  closeCLI();
  process.exit(0);
}

start();
