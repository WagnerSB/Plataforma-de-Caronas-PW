const { Router } = require('express');
const { getCaronas, addCarona, updateCarona, getCaronaPorCodigo, deletarCarona } = require('../controllers/caronaController')

const rotasCaronas = new Router();

rotasCaronas.route('/carona')
    .get(getCaronas)
    .post(addCarona)
    .put(updateCarona);

    rotasCaronas.route('/carona/:codigo')
    .get(getCaronaPorCodigo)
    .delete(deletarCarona);

module.exports = rotasCaronas;