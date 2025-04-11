const { Router } = require('express');
const { getReservas, addReserva, updateReserva, getReservaPorCodigo, deletarReserva } = require('../controllers/reservaController')

const rotasReservas = new Router();

rotasReservas.route('/reserva')
    .get(getReservas)
    .post(addReserva)
    .put(updateReserva);

    rotasReservas.route('/reserva/:codigo')
    .get(getReservaPorCodigo)
    .delete(deletarReserva);

module.exports = rotasReservas;