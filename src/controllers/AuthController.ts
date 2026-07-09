import { AuthService } from "../services/AuthService.js";
import { askQuestion, askPassword } from "../utils/cli.js";

export class AuthController {
  private authService = new AuthService();

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
      } catch (error: any) {
        tentativas++;
        console.log(`\n❌ Erro: ${error.message}`);
        if (tentativas < maxTentativas) {
          console.log(
            `Você tem mais ${maxTentativas - tentativas} tentativa(s).\n`,
          );
        }
      }
    }

    console.log("\n⛔ Número máximo de tentativas atingido. Acesso bloqueado.");
    return false;
  }
}
