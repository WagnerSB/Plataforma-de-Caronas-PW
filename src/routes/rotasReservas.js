const { Router } = require('express');
const { getReservas, addReserva, updateReserva, getReservaPorCodigo, deletarReserva, getUsuariosDisponiveis } = require('../controllers/reservaController')

const { verificaJWT } = require('../controllers/segurancaController');

const rotasReservas = new Router();

rotasReservas.route('/reserva')
    .get(verificaJWT, getReservas)
    .post(verificaJWT, addReserva)
    .put(verificaJWT, updateReserva);

rotasReservas.route('/reserva/:codigo')
    .get(verificaJWT, getReservaPorCodigo)
    .delete(verificaJWT, deletarReserva);
    
rotasReservas.route('/usuariosDisponiveis/:codigo_carona')
    .get(verificaJWT, getUsuariosDisponiveis);

module.exports = rotasReservas;