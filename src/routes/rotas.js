const { Router } = require('express');
const rotasUsuarios = require('./rotasUsuarios');
const rotasCaronas = require('./rotasCaronas');
const rotasAvaliacoes = require('./rotasAvaliacoes');
const rotasReservas = require('./rotasReservas');
const { login } = require('../controllers/segurancaController');

rotas = new Router();
rotas.use(rotasUsuarios);
rotas.use(rotasCaronas);
rotas.use(rotasAvaliacoes);
rotas.use(rotasReservas);

rotas.route("/login").post(login);

module.exports = rotas;