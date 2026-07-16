import { AuthService } from "../services/AuthService.js";
import { askPassword, askQuestion } from "../utils/cli.js";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async iniciarLogin(): Promise<boolean> {
    console.clear();
    console.log("==================================================");
    console.log("    Bem-vindo ao Acervo CLI");
    console.log("    Sistema de Gestão de Biblioteca");
    console.log("==================================================\n");
    console.log("Informe os dados do usuário");

    const maxTentativas = 3;
    let tentativas = 0;

    while (tentativas < maxTentativas) {
      const login = await askQuestion("login: ");
      const senha = await askPassword("senha: ");

      try {
        const autenticado = await this.authService.autenticar(login, senha);
        if (autenticado) {
          console.log("\n✅ Login realizado com sucesso!\n");
          return true;
        }
      } catch (error: unknown) {
        tentativas++;
        const mensagem = error instanceof Error ? error.message : String(error);
        console.log(`\n❌ Erro: ${mensagem}`);
        if (tentativas < maxTentativas) {
          console.log(
            `Você tem mais ${String(maxTentativas - tentativas)} tentativa(s).\n`,
          );
        }
      }
    }

    console.log("\n⛔ Número máximo de tentativas atingido. Acesso bloqueado.");
    return false;
  }
}
