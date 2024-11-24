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


    selectIdentByIdUser: async (idUser) => {

        const query =   'SELECT * from USUARIO a '+
                        'inner join IDENTIFICACAO b on a.id_identificacao = b.id '+
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
