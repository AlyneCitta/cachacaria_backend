const db = require('../db');

const Cupom = {

    findCupomByCod: async (codigo) => {

        const query = 'SELECT * from CUPOM_DESC where codigo = $1';
        const values = [codigo];

        try {
            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Erro ao buscar cupom:', error);
            throw new Error('Erro ao buscar cupom no banco de dados');
        }
    },


    findCupomById: async (idCupom) => {

        const query = 'SELECT * from CUPOM_DESC where id = $1';
        const values = [idCupom];

        try {
            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Erro ao buscar cupom:', error);
            throw new Error('Erro ao buscar cupom no banco de dados');
        }
    },


    insertCupomById: async (idUser, idCupom) => {

        const query = 'UPDATE CARRINHO set id_cupom_desc = $1 where id_usuario = $2 ';
        const values = [idCupom, idUser];
        try {
            await db.query(query, values);
        } catch (error) {
            console.error('Erro ao inserir cupom:', error);
            throw new Error('Erro ao inserir cupom no banco de dados');
        }
    },
};

module.exports = Cupom;
