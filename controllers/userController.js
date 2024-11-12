const User = require('../models/userModel');
const Identification = require('../models/identificationModel');

const userController = {
    register: async (req, res) => {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios' });
        }

        try {
            const userExists = await User.findByEmail(email);
            if (userExists) {
                return res.status(400).json({ message: 'Email já cadastrado' });
            }

            const newUser = await User.create(email, senha);
            res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user: newUser });
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            res.status(500).json({ message: 'Erro ao cadastrar usuário' });
        }
    },

    addIdentification: async (req, res) => {
        const { userId, nome, telefone, whatsapp, dta_nascimento, cep, logradouro, numero, complemento, id_cidade } = req.body;
    
        if (!userId || !nome || !telefone || !cep || !id_cidade) {
            return res.status(400).json({ message: 'Dados obrigatórios faltando' });
        }
    
        try {
   
            const id_identificacao = await Identification.create({
                nome,
                telefone,
                whatsapp,
                dta_nascimento,
                cep,
                logradouro,
                numero,
                complemento,
                id_cidade
            });
    
            // Atualizando o usuário com o id_identificacao
            const updatedUser = await User.updateIdentification(userId, id_identificacao);
    
            res.status(200).json({ message: 'Identificação adicionada com sucesso!', user: updatedUser });
        } catch (error) {
            console.error('Erro ao adicionar identificação:', error);
            res.status(500).json({ message: 'Erro ao adicionar identificação' });
        }
    },
};

module.exports = userController;
