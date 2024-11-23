const orderModel = require('../models/orderModel');

const orderController = {

    insertOrder: async (req, res) => {        
        const { IdUser, IdTransportadora, IdCupomDesc, IdEtapaPedido, IdFormaPagamento } = req.body;

        if (!IdUser) {
            return res.status(400).json({ message: 'Id do usário não informado' });
        }

        if (!IdTransportadora) {
            return res.status(400).json({ message: 'Id da transportadora não informado' });
        }

        if (!IdCupomDesc) {
            return res.status(400).json({ message: 'Id do cupom não informado' });
        }

        if (!IdEtapaPedido) {
            return res.status(400).json({ message: 'Id Etapa Pedido não informado' });
        }

        if (!IdFormaPagamento) {
            return res.status(400).json({ message: 'Id Forma de Pagamento não informado' });
        }

        try {            
            const idPedido = await orderModel.insertOrder(IdUser, IdTransportadora, IdCupomDesc, IdEtapaPedido, IdFormaPagamento);            
            return res.status(200).json({ message: 'OK',idPedido });
        } catch (error) {
            console.error('Erro ao inserir pedido: ', error);
            return res.status(500).json({ message: 'Erro ao inserir pedido no banco de dados' });
        }
    },


    insertItemOrder: async (req, res) => {        
        const { IdPedido } = req.params
        const { qtde, IdProduto} = req.body;

        if (!IdPedido) {
            return res.status(400).json({ message: 'Id do Pedido não informado' });
        }

        if (!qtde) {
            return res.status(400).json({ message: 'Quantidade não informada' });
        }

        if (!IdProduto) {
            return res.status(400).json({ message: 'Id do Produto não informado' });
        }

        try {            
            await orderModel.insertItemOrder(IdPedido, qtde, IdProduto);            
            return res.status(200).json({ message: 'OK' });
        } catch (error) {
            console.error('Erro ao inserir item pedido: ', error);
            return res.status(500).json({ message: 'Erro ao inserir item pedido no banco de dados' });
        }
    },


    getOrderByUser: async (req, res) => {        
        const { IdUser } = req.params;        

        if (!IdUser) {
            return res.status(400).json({ message: 'Id do Usuário não informado' });
        }
        try {            
            const orderItems = await orderModel.selectOrderByUser(IdUser);            
            return res.status(200).json(orderItems);
        } catch (error) {
            console.error('Erro ao inserir item pedido: ', error);
            return res.status(500).json({ message: 'Erro ao inserir item pedido no banco de dados' });
        }
    },
};

module.exports = orderController;

