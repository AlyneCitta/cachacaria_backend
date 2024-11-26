const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require("dotenv-safe").config();


const app = express();
const port = 3001;

const authRouter = require('./routes/authController');
const userRoutes = require('./routes/userRoutes');
const cityRoutes = require('./routes/cityRoutes'); 
const cartRoutes = require('./routes/cartRoutes');
const productRoutes = require('./routes/productRoutes');
const cupomDescRoutes = require('./routes/cupomDescRoutes');
const orderRoutes = require('./routes/orderRoutes');
const identRoutes = require('./routes/identRoutes');
const mercadopago = require('mercadopago');


app.use(cors());
app.use(express.json());

// Configuração do MercadoPago

function verifyJWT(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ auth: false, message: 'No token provided.' });
    }

    const tokenWithoutBearer = token.replace('Bearer ', '');

    jwt.verify(tokenWithoutBearer, process.env.SECRET, (err, decoded) => {
        if (err) {
            console.error('Erro ao verificar token:', err);
            return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        }

        // Anexar informações do usuário ao objeto de requisição
        req.userId = decoded.id;
        req.userRole = decoded.role; // Role incluída no payload do token
        next();
    });
}

// Rota para criar o link de pagamento
app.get('/api/payment', async (req, res) => {
    try {
        const paymentData = {
            items: [
                { id: '1', title: 'Produto 1', quantity: 1, currency_id: 'BRL', unit_price: 100.00 },
                { id: '2', title: 'Produto 2', quantity: 2, currency_id: 'BRL', unit_price: 150.00 }
            ],
            back_urls: {
                success: 'http://localhost:3000/success',
                failure: 'http://localhost:3000/failure',
                pending: 'http://localhost:3000/pending'
            },
            auto_return: 'approved',
        };

        // Criando a preferência de pagamento no MercadoPago
        const preference = await mercadopago.preferences.create(paymentData);

        // O link de pagamento gerado
        const paymentLink = preference.response.init_point;

        // Retornando o link de pagamento para o frontend
        res.json({ link_pagamento: paymentLink });
    } catch (error) {
        console.error('Erro ao criar link de pagamento:', error);
        res.status(500).json({ error: 'Erro ao criar link de pagamento' });
    }
});

// Rotas existentes
app.get('/', verifyJWT, (req, res) => {
    res.send('Servidor está funcionando!');
});

app.use('/auth', authRouter);
app.use('/api/users', userRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cupom', cupomDescRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/ident', identRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
