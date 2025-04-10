const { Router } = require('express');
const rotasUsuarios = require('./rotasUsuarios')

rotas = new Router();
rotas.use(rotasUsuarios);

module.exports = rotas;