const cupomDescModel = require('../models/cupomDescModel');

const cupomDescController = {
    getCupomByCod: async (req, res) => {        
        const { codigo } = req.params;
        
        if (!codigo) {
            return res.status(400).json({ message: 'Código do cupom não informado' });
        }

        try {
            // Busca cupom
            const cupomDesc = await cupomDescModel.findCupomByCod(codigo);            
            // Verific se retornou algum cupom
            if (cupomDesc === undefined) {                                           
                return res.status(200).json({message: 'CoupomNotFound'});
            }                        
            // retorna cupom
            return res.status(200).json(cupomDesc);
        } catch (error) {
            console.error('Erro ao buscar cupom:', error);
            return res.status(500).json({ message: 'Erro ao buscar cupom no banco de dados' });
        }
    },


    getCupomById: async (req, res) => {        
        const { idCupom } = req.query;
        
        if (!idCupom) {
            return res.status(400).json({ message: 'ID do cupom não informado' });
        }

        try {
            // Busca cupom
            const cupomDesc = await cupomDescModel.findCupomById(idCupom);

            // Verifica se retornou algum cupom
            if (!cupomDesc) {                
                return res.status(404).json({ message: 'CoupomNotFound' });
            }

            // retorna cupom
            return res.status(200).json(cupomDesc);
        } catch (error) {
            console.error('Erro ao buscar cupom:', error);
            return res.status(500).json({ message: 'Erro ao buscar cupom no banco de dados' });
        }
    },


    setCupomById: async (req, res) => {        
        const { idUser, idCupom } = req.body;

        if (!idUser) {
            return res.status(400).json({ message: 'Id do usário informado' });
        }

        if (!idCupom) {
            return res.status(400).json({ message: 'Id do cupom não informado' });
        }

        try {
            // Seta o cupom no carrinho do usuário
            await cupomDescModel.insertCupomById(idUser, idCupom);
            // retorna cupom
            return res.status(200).json({message: 'OK'});
        } catch (error) {
            console.error('Erro ao buscar cupom:', error);
            return res.status(500).json({ message: 'Erro ao buscar cupom no banco de dados' });
        }
    },
};

module.exports = cupomDescController;

