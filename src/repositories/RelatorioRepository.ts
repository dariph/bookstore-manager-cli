import { pool } from "../database/connection.js";

export class RelatorioRepository {
  async listarLivrosEmprestados(): Promise<any[]> {
    const query = `
            SELECT l.titulo, c.nome as cliente, e.data_emprestimo 
            FROM emprestimos e
            INNER JOIN livros l ON e.livro_id = l.id
            INNER JOIN clientes c ON e.cliente_id = c.id
            WHERE e.status = 'ATIVO'
            ORDER BY e.data_emprestimo ASC;
        `;
    const res = await pool.query(query);
    return res.rows;
  }

  async listarQuantidadeEmprestimosPorLivro(): Promise<any[]> {
    const query = `
            SELECT l.titulo, COUNT(e.id) as total_emprestimos
            FROM livros l
            LEFT JOIN emprestimos e ON l.id = e.livro_id
            GROUP BY l.titulo
            ORDER BY total_emprestimos DESC
            LIMIT 5;
        `;
    const res = await pool.query(query);
    return res.rows;
  }

  async listarLivrosDisponiveis(): Promise<any[]> {
    const query = `
            SELECT titulo, quantidade_disponivel 
            FROM livros 
            WHERE quantidade_disponivel > 0 
            ORDER BY titulo ASC;
        `;
    const res = await pool.query(query);
    return res.rows;
  }

  async listarLivrosPorAutor(): Promise<any[]> {
    const query = `
            SELECT a.nome as autor, COUNT(l.id) as total_livros
            FROM autores a
            LEFT JOIN livros l ON a.id = l.autor_id
            GROUP BY a.nome
            ORDER BY a.nome ASC;
        `;
    const res = await pool.query(query);
    return res.rows;
  }

  async listarClientesComEmprestimosAtivos(): Promise<any[]> {
    const query = `
            SELECT DISTINCT c.nome, c.email
            FROM clientes c
            INNER JOIN emprestimos e ON c.id = e.cliente_id
            WHERE e.status = 'ATIVO'
            ORDER BY c.nome ASC;
        `;
    const res = await pool.query(query);
    return res.rows;
  }
}
