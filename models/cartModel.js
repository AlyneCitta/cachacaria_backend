const db = require('../db');

const Cart = {
    // create: async (email, senha) => {
    //     const query = 'INSERT INTO usuario (email, senha) VALUES ($1, $2) RETURNING *';
    //     const values = [email, senha];

    //     try {
    //         const result = await db.query(query, values);
    //         return result.rows[0];
    //     } catch (error) {
    //         throw error;
    //     }
    // },

    findCartById: async (idUser) => {        
        const query  =  'SELECT a.*, b.preco from CARRINHO a ' +
                        'inner join produto b on b.id = a.id_produto '+
                        'where id_usuario = $1 ';                        
        const values = [idUser];

        try {
            const result = await db.query(query, values);            
            return result.rows;
        } catch (error) {
            console.error('Erro ao buscar carrinho:', error);
            throw new Error('Erro ao buscar carrinho no banco de dados');
        }
    },


    deleteProduct: async (IdUser, IdProduct) => {
        const query = 'DELETE from CARRINHO where id_usuario = $1 and id_produto = $2';
        const values = [IdUser, IdProduct];

        try {
            const result = await db.query(query, values);            
            return result.rows;
        } catch (error) {
            console.error('Erro ao deletar item do carrinho:', error);
            throw new Error('Erro ao deletar item do banco de dados');
        }
    },

    updateProduct: async (IdUser, IdProduct, action) => {
        let query =   'UPDATE CARRINHO set qtde = qtde ';
        
        if (action === 'increase') {
            query += '+ 1 ';
        } else if(action === 'decrease') {
            query += '- 1 ';
        }
        query += 'where id_usuario = $1 and id_produto = $2';        
        const values = [IdUser, IdProduct];

        try {
            const result = await db.query(query, values);            
            return result.rows;
        } catch (error) {
            console.error('Erro ao atualizar quantidade do item:', error);
            throw new Error('Erro ao atualizar quantidade do item do banco de dados');
        }
    },

    deleteCart: async (IdUser) => {
        const query = 'DELETE from CARRINHO where id_usuario = $1';
        const values = [IdUser];

        try {
            await db.query(query, values);                        
        } catch (error) {
            console.error('Erro ao deletar carrinho:', error);
            throw new Error('Erro ao deletar carrinho no banco de dados');
        }
    },
};

module.exports = Cart;
