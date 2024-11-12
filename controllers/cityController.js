const db = require('../db'); 

// Função para buscar cidades por nome
exports.getCitiesByName = async (req, res) => {
  const { query } = req.query; // Pega o parâmetro "query" enviado na URL
  
  // Verifica se o parâmetro "query" foi enviado
  if (!query) {
    return res.status(400).json({ message: 'Query é obrigatória' });
  }

  try {
    // Consulta para buscar cidades que contenham o nome informado (utiliza ILIKE para fazer a busca sem considerar maiúsculas/minúsculas)
    const result = await db.query(
      'SELECT id, nome FROM cidade WHERE nome ILIKE $1 LIMIT 10',
      [`%${query}%`] // O operador % é utilizado para fazer a busca por substring
    );

    // Verifica se há cidades no banco de dados
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Nenhuma cidade encontrada' });
    }

    // Retorna as cidades encontradas
    res.json(result.rows);

  } catch (error) {
    console.error('Erro ao buscar cidades:', error);
    res.status(500).json({ message: 'Erro ao buscar cidades' });
  }
};
