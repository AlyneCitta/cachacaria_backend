const identModel = require('../models/identModel');

const indetController = {

    getIdentByIdUser: async (req, res) => {        
        const { IdUser } = req.params;

        if (!IdUser) {
            return res.status(400).json({ message: 'Id do usário informado' });
        }      

        try {
            const cupomDesc = await cupomDescModel.findCupomById(idCupom);

            // Verifique se retornou algum cupom
            if (cupomDesc.length === 0) {
                return res.status(404).json({ message: 'Cupom não localizado' });
            }

            // retorna cupom
            return res.status(200).json(cupomDesc);
        } catch (error) {
            console.error('Erro ao buscar cupom:', error);
            return res.status(500).json({ message: 'Erro ao buscar cupom no banco de dados' });
        }
    },
};

module.exports = indetController;

