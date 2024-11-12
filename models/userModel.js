const db = require('../db');
const Identification = require('./identificationModel');

const User = {
    create: async (email, senha) => {
        const query = 'INSERT INTO usuario (email, senha) VALUES ($1, $2) RETURNING *';
        const values = [email, senha];

        try {
            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    findByEmail: async (email) => {
        const query = 'SELECT * FROM usuario WHERE email = $1';
        const values = [email];

        try {
            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    updateIdentification: async (userId, id_identificacao) => {
        const query = 'UPDATE usuario SET id_identificacao = $1 WHERE id = $2 RETURNING *';
        const values = [id_identificacao, userId];

        try {
            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },
};

module.exports = User;
