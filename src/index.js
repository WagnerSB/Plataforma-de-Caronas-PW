require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rotas = require('./routes/rotas');

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cors());

app.use(rotas)

app.listen(PORT, () => {
    console.log(`Servidor da API rodando na porta ${PORT}`);
})