export interface Autor {
  id?: number;
  nome: string;
  nacionalidade: string;
  ativo?: boolean;
}

export interface Usuario {
  id?: number;
  login: string;
  senha?: string;
}

export interface Livro {
  id?: number;
  titulo: string;
  autor_id: number;
  quantidade_disponivel: number;
  ativo?: boolean;
}

export interface LivroDisponivel {
  id: number;
  titulo: string;
  quantidade_disponivel: number;
}

export interface LivroPorAutor {
  autor: string;
  total_livros: string | number;
}

export interface LivroEmprestado {
  emprestimo_id: number;
  livro: string;
  cliente: string;
  data_emprestimo: Date;
}

export interface Cliente {
  id?: number;
  nome: string;
  email: string;
  ativo?: boolean;
}

export interface ClienteComEmprestimo {
  nome: string;
  email: string;
  emprestimos_ativos: number | string;
}

export interface Emprestimo {
  id?: number;
  livro_id: number;
  cliente_id: number;
  data_emprestimo?: Date;
  data_devolucao?: Date;
  status?: string;
}

export interface EmprestimoRelatorio {
  id: number;
  livro: string;
  cliente: string;
  data_emprestimo: Date | string | null;
  data_devolucao: Date | string | null;
  status: string;
}

export interface EmprestimoPorLivro {
  titulo: string;
  total_emprestimos: number | string;
}

export interface LivroDetalhado {
  id: number;
  titulo: string;
  autor: string;
  quantidade_disponivel: number;
}

export interface ClienteListagem {
  id: number;
  nome: string;
  email: string;
  ativo: boolean;
}
