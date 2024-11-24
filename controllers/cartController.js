const cartModel = require('../models/cartModel');

const cartController = {
    getFullCart: async (req, res) => {
        const { IdUser } = req.params;

        if (!IdUser) {
            return res.status(400).json({ message: 'Id do usuário não informado' });
        }

        try {
            // Busca itens do carrinho
            const cartItems = await cartModel.findCartById(IdUser);

            // Verifique se há itens no carrinho
            if (cartItems.length === 0) {
                return res.status(200).json({ message: 'EmptyCart' });
            }

            // Retornando os itens do carrinho
            return res.status(200).json(cartItems);
        } catch (error) {
            console.error('Erro ao buscar carrinho:', error);
            return res.status(500).json({ message: 'Erro ao buscar carrinho no banco de dados' });
        }
    },


    deleteProduct: async (req, res) => {
        const { IdProduct } = req.params;
        const { IdUser } = req.query;

        if (!IdProduct) {
            return res.status(400).json({ message: 'Id do produto não informado' });
        }

        if (!IdUser) {
            return res.status(400).json({ message: 'Id do usuário não informado' });
        }

        try {            
            //deleta o item do carrinho
            await cartModel.deleteProduct(IdUser, IdProduct);                        
            return res.status(200).json({ message: 'OK' });
        } catch (error) {
            console.error('Erro ao deletar item:', error);
            return res.status(500).json({ message: 'Erro ao deletar item no banco de dados' });
        }
    },


    updateProduct: async (req, res) => {
        const { IdProduct } = req.params;
        const { IdUser, action } = req.body;        

        if (!IdProduct) {
            return res.status(400).json({ message: 'Id do porduto não informado' });
        }

        if (!IdUser) {
            return res.status(400).json({ message: 'Id do usuário não informado' });
        }

        if (!action) {
            return res.status(400).json({ message: 'Ação não informada' });
        }

        try {
            // atualiza quantidade do item
            await cartModel.updateProduct(IdUser, IdProduct, action);            
            return res.status(200).json({ message: 'OK' });
        } catch (error) {
            console.error('Erro ao atualizar quantidade do item:', error);
            return res.status(500).json({ message: 'Erro ao atualizar quantidade do item no banco de dados'});
        }
    },

    deleteCart: async (req, res) => {                
        const idUser = req.headers['iduser'];
        if (!idUser) {
            return res.status(400).json({ message: 'Id do Usuário não informado' });
        }

        try {            
            //deleta o carrinho
            await cartModel.deleteCart(idUser);                        
            return res.status(200).json({ message: 'OK' });
        } catch (error) {
            console.error('Erro ao deletar item:', error);
            return res.status(500).json({ message: 'Erro ao deletar item no banco de dados' });
        }
    },

    insertItemCart: async (req, res) => {        
        const { IdUser, IdProd, quantidade, idTransp, idCupom } = req.body;        

        if (!IdProd) {
            return res.status(400).json({ message: 'Id do porduto não informado' });
        }

        if (!IdUser) {
            return res.status(400).json({ message: 'Id do usuário não informado' });
        }

        if (!quantidade) {
            return res.status(400).json({ message: 'Quantidade não informada' });
        }
        if (!idTransp) {
            return res.status(400).json({ message: 'Id da Transportadora não informado' });
        }

        if (!idCupom) {
            return res.status(400).json({ message: 'Id do cupom não informado' });
        }

        try {
            // atualiza quantidade do item
            await cartModel.insertProduct(IdUser, IdProd, quantidade, idTransp, idCupom);            
            return res.status(200).json({ message: 'OK' });
        } catch (error) {
            console.error('Erro ao atualizar quantidade do item:', error);
            return res.status(500).json({ message: 'Erro ao atualizar quantidade do item no banco de dados'});
        }
    },

};

module.exports = cartController;

