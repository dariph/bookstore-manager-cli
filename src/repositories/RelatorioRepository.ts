import { pool } from "../database/connection.js";

export class RelatorioRepository {
  async listarLivrosDisponiveis() {
    const query = `
      SELECT id, titulo, quantidade_disponivel 
      FROM livros 
      WHERE quantidade_disponivel > 0;
    `;
    const res = await pool.query(query);
    return res.rows;
  }

  async listarLivrosEmprestados() {
    const query = `
      SELECT e.id AS emprestimo_id, l.titulo AS livro, c.nome AS cliente, e.data_emprestimo
      FROM emprestimos e
      INNER JOIN livros l ON e.livro_id = l.id
      INNER JOIN clientes c ON e.cliente_id = c.id
      WHERE e.status = 'ativo' OR e.data_devolucao IS NULL;
    `;
    const res = await pool.query(query);
    return res.rows;
  }

  async listarLivrosPorAutor() {
    const query = `
      SELECT a.nome AS autor, COUNT(l.id) AS total_livros
      FROM autores a
      LEFT JOIN livros l ON a.id = l.autor_id
      GROUP BY a.nome
      ORDER BY total_livros DESC;
    `;
    const res = await pool.query(query);
    return res.rows;
  }

  async listarQuantidadeEmprestimosPorLivro() {
    const query = `
      SELECT l.titulo, COUNT(e.id) AS total_emprestimos
      FROM livros l
      LEFT JOIN emprestimos e ON l.id = e.livro_id
      GROUP BY l.titulo
      ORDER BY total_emprestimos DESC;
    `;
    const res = await pool.query(query);
    return res.rows;
  }

  async listarClientesComEmprestimosAtivos() {
    const query = `
      SELECT c.nome, c.email, COUNT(e.id) AS emprestimos_ativos
      FROM clientes c
      INNER JOIN emprestimos e ON c.id = e.cliente_id
      WHERE e.status = 'ativo' OR e.data_devolucao IS NULL
      GROUP BY c.id, c.nome, c.email;
    `;
    const res = await pool.query(query);
    return res.rows;
  }
}
