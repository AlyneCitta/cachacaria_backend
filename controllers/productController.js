const productModel = require('../models/productModel');

const cartController = {
    getProducById: async (req, res) => {        
        const idProd = req.params.id;
        
        if (!idProd) {
            return res.status(400).json({ message: 'Id do produto não informado' });
        }

        try {
            // Busca itens do carrinho
            const product = await productModel.findProductById(idProd);

            // Verifique se há itens no carrinho
            if (product.length === 0) {
                return res.status(404).json({ message: 'Produto não localizado' });
            }

            // Retornando os itens do carrinho            
            return res.status(200).json(product);
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
            return res.status(500).json({ message: 'Erro ao buscar produto no banco de dados' });
        }
    },
};

module.exports = cartController;

