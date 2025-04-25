const { Router } = require('express');
const { getReservas, addReserva, updateReserva, getReservaPorCodigo, deletarReserva, getUsuariosDisponiveis } = require('../controllers/reservaController')

const rotasReservas = new Router();

rotasReservas.route('/reserva')
    .get(getReservas)
    .post(addReserva)
    .put(updateReserva);

rotasReservas.route('/reserva/:codigo')
    .get(getReservaPorCodigo)
    .delete(deletarReserva);
    
rotasReservas.route('/usuariosDisponiveis/:codigo_carona')
    .get(getUsuariosDisponiveis);

module.exports = rotasReservas;