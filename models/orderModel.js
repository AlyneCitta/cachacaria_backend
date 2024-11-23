const db = require('../db');

const Order = {

    insertOrder: async (IdUser, IdTransportadora, IdCupomDesc, IdEtapaPedido, IdFormaPagamento) => {

        const query =   'INSERT INTO PEDIDO (dta_registro, id_usuario, id_transportadora, '+
                        'id_cupom_desc, id_etapa_pedido, id_forma_pagamento) values ' +
                        '(CURRENT_DATE, $1, $2, $3, $4, $5) '+
                        'RETURNING id';
        const values = [IdUser, IdTransportadora, IdCupomDesc, IdEtapaPedido, IdFormaPagamento];
        try {
            const result = await db.query(query, values);      
            return result.rows[0].id;                          
        } catch (error) {
            console.error('Erro ao inserir pedido:', error);
            throw new Error('Erro ao inserir pedido no banco de dados');
        }
    },

    insertItemOrder: async (IdPedido, qtde, IdProduto) => {

        const query =   'INSERT INTO ITEM_PEDIDO ' +
                        '(id_pedido, qtde, id_produto) ' +
                        'values ($1, $2, $3)';
        const values = [IdPedido, qtde, IdProduto];
        try {
            await db.query(query, values);            
        } catch (error) {
            console.error('Erro ao inserir item pedido', error);
            throw new Error('Erro ao inserir item pedido no banco de dados');
        }
    },


    selectOrderByUser: async (IdUser) => {

        const query =   'select b.id id_produto, CONCAT(b.nome, \' - \', b.capacidade_ml, \'ml\') ' +
                        'nome_produto, a.qtde quantidade_pedido, ' +
                        'b.preco preco_produto from item_pedido a ' + 
                        'inner join produto b on b.id = a.id_produto ' +
                        'where a.id_pedido = (select id from pedido where id_usuario = $1 ' +
                        'order by dta_registro desc, id desc limit 1)';
        const values = [IdUser];
        try {
            const result = await db.query(query, values);            
            return result.rows;    
        } catch (error) {
            console.error('Erro ao buscar pedido', error);
            throw new Error('Erro ao buscar pedido no banco de dados');
        }
    },
};

module.exports = Order;
