const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const userRoutes = require('./routes/userRoutes');
const cityRoutes = require('./routes/cityRoutes'); 

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor está funcionando!');
});

app.use('/api/users', userRoutes);
app.use('/api/cities', cityRoutes); 

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
