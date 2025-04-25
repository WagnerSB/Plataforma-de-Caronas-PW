const { Router } = require('express');
const { getCaronas, addCarona, updateCarona, getCaronaPorCodigo, deletarCarona, getMotoristas } = require('../controllers/caronaController')

const rotasCaronas = new Router();

rotasCaronas.route('/carona')
    .get(getCaronas)
    .post(addCarona)
    .put(updateCarona);

    rotasCaronas.route('/carona/:codigo')
    .get(getCaronaPorCodigo)
    .delete(deletarCarona);

    rotasCaronas.route('/motoristas')
    .get(getMotoristas);

module.exports = rotasCaronas;