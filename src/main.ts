import { AuthController } from "./controllers/AuthController.js";
import { AutorController } from "./controllers/AutorController.js";
import { ClienteController } from "./controllers/ClienteController.js";
import { EmprestimoController } from "./controllers/EmprestimoController.js";
import { LivroController } from "./controllers/LivroController.js";
import { RelatorioController } from "./controllers/RelatorioController.js";
import { testConnection } from "./database/connection.js";
import { AuthRepository } from "./repositories/AuthRepository.js";
import { AutorRepository } from "./repositories/AutorRepository.js";
import { ClienteRepository } from "./repositories/ClienteRepository.js";
import { EmprestimoRepository } from "./repositories/EmprestimoRepository.js";
import { LivroRepository } from "./repositories/LivroRepository.js";
import { RelatorioRepository } from "./repositories/RelatorioRepository.js";
import { AuthService } from "./services/AuthService.js";
import { AutorService } from "./services/AutorService.js";
import { ClienteService } from "./services/ClienteService.js";
import { EmprestimoService } from "./services/EmprestimoService.js";
import { LivroService } from "./services/LivroService.js";
import { askQuestion } from "./utils/cli.js";

async function start() {
  await testConnection();

  const authRepo = new AuthRepository();
  const autorRepo = new AutorRepository();
  const livroRepo = new LivroRepository();
  const clienteRepo = new ClienteRepository();
  const emprestimoRepo = new EmprestimoRepository();
  const relatorioRepo = new RelatorioRepository();

  const authService = new AuthService(authRepo);
  const autorService = new AutorService(autorRepo);
  const livroService = new LivroService(livroRepo, autorRepo);
  const clienteService = new ClienteService(clienteRepo);
  const emprestimoService = new EmprestimoService(emprestimoRepo);

  const authController = new AuthController(authService);
  const autorController = new AutorController(autorService);
  const livroController = new LivroController(livroService);
  const clienteController = new ClienteController(clienteService);
  const emprestimoController = new EmprestimoController(emprestimoService);
  const relatorioController = new RelatorioController(relatorioRepo);

  const acessoLiberado = await authController.iniciarLogin();
  if (!acessoLiberado) {
    process.exit(1);
  }

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

  process.exit(0);
}

start().catch((error: unknown) => {
  console.error("❌ Erro fatal na aplicação:", error);
  process.exit(1);
});
