export interface Autor {
  id?: number;
  nome: string;
  nacionalidade: string;
}

export interface Livro {
  id?: number;
  titulo: string;
  autor_id: number;
  quantidade_disponivel: number;
}

export interface Cliente {
  id?: number;
  nome: string;
  email: string;
}

export interface Emprestimo {
  id?: number;
  livro_id: number;
  cliente_id: number;
  data_emprestimo?: Date;
  data_devolucao?: Date;
  status?: string;
}

export interface Usuario {
  id?: number;
  login: string;
  senha?: string;
}
