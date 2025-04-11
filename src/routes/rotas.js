const { Router } = require('express');
const rotasUsuarios = require('./rotasUsuarios');
const rotasCaronas = require('./rotasCaronas');
const rotasAvaliacoes = require('./rotasAvaliacoes');
const rotasReservas = require('./rotasReservas');

rotas = new Router();
rotas.use(rotasUsuarios);
rotas.use(rotasCaronas);
rotas.use(rotasAvaliacoes);
rotas.use(rotasReservas);

module.exports = rotas;