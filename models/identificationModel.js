const db = require('../db');

const Identification = {

    create: async (identificacao) => {
        const { nome, telefone, whatsapp, dta_nascimento, cep, logradouro, numero, complemento, id_cidade } = identificacao;

        const query = `INSERT INTO identificacao (nome, telefone, whatsapp, dta_nascimento, cep, logradouro, numero, complemento, id_cidade)
                       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`;
        const values = [nome, telefone, whatsapp, dta_nascimento, cep, logradouro, numero, complemento, id_cidade];

        try {
            const result = await db.query(query, values);
            return result.rows[0].id;
        } catch (error) {
            throw error;
        }
    },

    update: async (identificacao) => {
        const { nome, telefone, whatsapp, dta_nascimento, cep, logradouro, numero, complemento, id_cidade, id_ident } = identificacao;

        const query = `UPDATE IDENTIFICACAO set nome = $1, telefone = $2, whatsapp = $3, dta_nascimento = $4, cep = $5, logradouro = $6, numero = $7, complemento = $8, id_cidade = $9
                         where id = $10`;
        const values = [nome, telefone, whatsapp, dta_nascimento, cep, logradouro, numero, complemento, id_cidade, id_ident];

        try {
            await db.query(query, values);
        } catch (error) {
            throw error;
        }
    },


    delete: async (identificacao) => {
        const { id_user, id_ident } = identificacao;
        try {
            const query = 'delete from item_pedido where id_pedido in (select id from pedido where id_usuario = $1)';
            const values = [id_user];
            await db.query(query, values);
        } catch (error) {
            throw error;
        }
        try {
            const query = 'delete from pedido where id_usuario = $1';;
            const values = [id_user];
            await db.query(query, values);
        } catch (error) {
            throw error;
        }
        try {
            const query = 'delete from carrinho where id_usuario = $1';
            const values = [id_user];
            await db.query(query, values);
        } catch (error) {
            throw error;
        }
        try {
            const query = 'delete from usuario where id = $1';
            const values = [id_user];
            await db.query(query, values);
        } catch (error) {
            throw error;
        }
        try {
            const query = 'delete from identificacao where id = $1';
            const values = [id_ident];
            await db.query(query, values);
        } catch (error) {
            throw error;
        }
    },


    selectIdentByIdUser: async (idUser) => {

        const query = 'SELECT * from USUARIO a ' +
            'inner join IDENTIFICACAO b on a.id_identificacao = b.id ' +
            'where a.id = $1';
        const values = [idUser];
        try {
            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Erro ao localizar identificaçao:', error);
            throw new Error('Erro ao  localizar identificaçao no banco de dados');
        }
    },
};

module.exports = Identification;
