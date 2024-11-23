const db = require('../db');

const Ident = {

    selectIdentByIdUser: async (idUser, idCupom) => {

        const query =   'UPDATE CARRINHO set id_cupom_desc = $1 where id_usuario = $2 ';
        const values = [idCupom, idUser];
        try {
            await db.query(query, values);                                
        } catch (error) {
            console.error('Erro ao inserir cupom:', error);
            throw new Error('Erro ao inserir cupom no banco de dados');
        }
    },
};

module.exports = Ident;
