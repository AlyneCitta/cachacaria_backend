const db = require('../db');


const cityController = {
  getCitiesByName: async (req, res) => {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Query é obrigatória' });
    }

    try {
      const result = await db.query(
        'SELECT id, nome FROM cidade WHERE nome ILIKE $1 LIMIT 10',
        [`%${query}%`]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Nenhuma cidade encontrada' });
      }
      res.json(result.rows);
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
      res.status(500).json({ message: 'Erro ao buscar cidades' });
    }
  },

  getCitiesById: async (req, res) => {
    const { IdCity } = req.params;

    if (!IdCity) {
      return res.status(400).json({ message: 'Query é obrigatória' });
    }

    try {
      const result = await db.query('SELECT id, nome FROM cidade WHERE id = $1',
        [`${IdCity}`]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Nenhuma cidade encontrada' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
      res.status(500).json({ message: 'Erro ao buscar cidades' });
    }
  },
};

module.exports = cityController;