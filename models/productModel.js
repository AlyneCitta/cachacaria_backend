const db = require('../db');

const Product = {


    findProductById: async (idProd) => {

        const query =   'select a.id id_produto, a.codigo, a.nome, '+
                        'a.ingredientes, a.descricao, a.preco, a.capacidade_ml, '+
                        'c.nome categoria, sum(e.qtd_fisica) qtd_fisica from produto a '+
                        'inner join sabor b on b.id = a.id_sabor '+
                        'inner join categoria c on c.id = b.id_categoria '+
                        'inner join lote d on d.id_produto = a.id '+
                        'inner join estoque e on e.id_lote = d.id '+
                        'where a.id = $1 '+
                        'group by a.id, a.codigo, a.nome, a.ingredientes, '+
                        'a.descricao,a.preco, a.capacidade_ml, c.nome';
        const values = [idProd];

        try {
            const result = await db.query(query, values);                    
            return result.rows[0];
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
            throw new Error('Erro ao buscar produto no banco de dados');
        }
    },
};

module.exports = Product;
