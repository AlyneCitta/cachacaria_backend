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
};

module.exports = Identification;
