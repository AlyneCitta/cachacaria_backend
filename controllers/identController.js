const identificationModel = require('../models/identificationModel');

const indetController = {

    getIdentByIdUser: async (req, res) => {
        const { IdUser } = req.params;

        if (!IdUser) {
            return res.status(400).json({ message: 'Id do usário não informado' });
        }

        try {
            const identification = await identificationModel.selectIdentByIdUser(IdUser);

            if (!identification) {
                console.error("Usuário não encontrado");
                return res.status(200).json({ message: 'IdentNotFound' });
            }
            return res.status(200).json(identification);
        } catch (error) {
            console.error('Erro ao buscar Identificação:', error);
            return res.status(500).json({ message: 'Erro ao buscar Identificação no banco de dados' });
        }
    },

    updateIdentification: async (req, res) => {
        const { nome, telefone, whatsapp, dta_nascimento, cep, logradouro, numero, complemento, id_cidade, id_ident } = req.body;

        if (!id_ident || !nome || !telefone || !cep || !id_cidade) {
            return res.status(400).json({ message: 'Dados obrigatórios faltando' });
        }

        try {
            await identificationModel.update({
                nome,
                telefone,
                whatsapp,
                dta_nascimento,
                cep,
                logradouro,
                numero,
                complemento,
                id_cidade,
                id_ident
            });
            res.status(200).json({ message: 'OK' });
        } catch (error) {
            console.error('Erro ao atualizar identificação:', error);
            res.status(500).json({ message: 'Erro ao atualizar identificação' });
        }
    },
    
    deleteIdentification: async (req, res) => {
        const { id_user, id_ident } = req.body;

        if (!id_user || !id_ident) {
            return res.status(400).json({ message: 'Dados obrigatórios faltando' });
        }

        try {
            await identificationModel.delete({
                id_user,
                id_ident
            });
            res.status(200).json({ message: 'OK' });
        } catch (error) {
            console.error('Erro ao excluir conta:', error);
            res.status(500).json({ message: 'Erro ao excluir conta' });
        }
    },
};

module.exports = indetController;

