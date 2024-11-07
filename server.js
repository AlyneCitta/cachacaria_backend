const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rota inicial básica para teste
app.get('/', (req, res) => {
  res.send('Servidor está funcionando!');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});