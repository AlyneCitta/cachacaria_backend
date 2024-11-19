const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require("dotenv-safe").config();

const app = express();
const port = 3001;

const authRouter = require('./routes/authController');
const userRoutes = require('./routes/userRoutes');
const cityRoutes = require('./routes/cityRoutes'); 

app.use(cors());
app.use(express.json());

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

app.get('/', verifyJWT, (req, res) => {
    res.send('Servidor está funcionando!');
});

app.use('/auth', authRouter);
app.use('/api/users', userRoutes);
app.use('/api/cities', cityRoutes); 

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
