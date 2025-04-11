const { Router } = require('express');
const rotasUsuarios = require('./rotasUsuarios');
const rotasCaronas = require('./rotasCaronas');
const rotasAvaliacoes = require('./rotasAvaliacoes');

rotas = new Router();
rotas.use(rotasUsuarios);
rotas.use(rotasCaronas);
rotas.use(rotasAvaliacoes);

module.exports = rotas;