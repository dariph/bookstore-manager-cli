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
            ORDER BY total_emprestimos DESC;
        `;
    const res = await pool.query(query);
    return res.rows;
  }
}
