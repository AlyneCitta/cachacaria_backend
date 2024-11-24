const identificationModel = require('../models/identificationModel');

const indetController = {

    getIdentByIdUser: async (req, res) => {        
        const { IdUser } = req.params;

        if (!IdUser) {
            return res.status(400).json({ message: 'Id do usário não informado' });
        }      

        try {
            const identification = await identificationModel.selectIdentByIdUser(IdUser);

            if (identification.length === 0) {
                console.log("Deue ruim");
                return res.status(200).json({ message: 'IdentNotFound' });
            }
            return res.status(200).json(identification);
        } catch (error) {
            console.error('Erro ao buscar Identificação:', error);
            return res.status(500).json({ message: 'Erro ao buscar Identificação no banco de dados' });
        }
    },
};

module.exports = indetController;

