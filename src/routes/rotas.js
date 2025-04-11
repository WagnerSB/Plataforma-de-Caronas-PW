const { Router } = require('express');
const rotasUsuarios = require('./rotasUsuarios')
const rotasCaronas = require('./rotasCaronas')

rotas = new Router();
rotas.use(rotasUsuarios);
rotas.use(rotasCaronas);

module.exports = rotas;