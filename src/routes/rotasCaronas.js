const { Router } = require('express');
const { getCaronas, addCarona, updateCarona, getCaronaPorCodigo, deletarCarona, getMotoristas } = require('../controllers/caronaController')

const { verificaJWT } = require('../controllers/segurancaController');

const rotasCaronas = new Router();

rotasCaronas.route('/carona')
    .get(verificaJWT, getCaronas)
    .post(verificaJWT, addCarona)
    .put(verificaJWT, updateCarona);

    rotasCaronas.route('/carona/:codigo')
    .get(verificaJWT, getCaronaPorCodigo)
    .delete(verificaJWT, deletarCarona);

    rotasCaronas.route('/motoristas')
    .get(verificaJWT, getMotoristas);

module.exports = rotasCaronas;