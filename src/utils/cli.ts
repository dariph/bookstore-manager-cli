import { input, password } from "@inquirer/prompts";

export async function askQuestion(mensagem: string): Promise<string> {
  return await input({
    message: mensagem,
    validate: (value) => {
      if (value.trim().length === 0) {
        return "Este campo não pode ficar vazio. Por favor, digite um valor válido.";
      }
      return true;
    },
  });
}

export async function askPassword(mensagem: string): Promise<string> {
  return await password({
    message: mensagem,
    mask: "*",
    validate: (value) => {
      if (value.trim().length === 0) {
        return "A senha não pode ficar vazia. Por favor, digite sua senha.";
      }
      return true;
    },
  });
}
