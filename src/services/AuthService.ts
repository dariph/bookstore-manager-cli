import { AuthRepository } from "../repositories/AuthRepository.js";
import * as bcrypt from "bcrypt";

export class AuthService {
  private authRepo = new AuthRepository();

  async autenticar(login: string, senhaDigitada: string): Promise<boolean> {
    if (!login || !senhaDigitada) {
      throw new Error("Login e senha são obrigatórios.");
    }

    const usuario = await this.authRepo.buscarPorLogin(login);

    if (!usuario || !usuario.senha) {
      throw new Error("Usuário ou senha incorretos.");
    }

    const senhaValida = await bcrypt.compare(senhaDigitada, usuario.senha);

    if (!senhaValida) {
      throw new Error("Usuário ou senha incorretos.");
    }

    return true;
  }
}
