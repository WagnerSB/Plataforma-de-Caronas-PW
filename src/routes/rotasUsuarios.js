const { Router } = require('express');
const { getUsuarios, addUsuario, updateUsuario, getUsuarioPorCodigo, deletarUsuario } = require('../controllers/usuarioController')

const { verificaJWT } = require('../controllers/segurancaController');

const rotasUsuarios = new Router();

rotasUsuarios.route('/usuario')
    .get(verificaJWT, getUsuarios)
    .post(addUsuario)
    .put(verificaJWT, updateUsuario);

rotasUsuarios.route('/usuario/:codigo')
    .get(verificaJWT, getUsuarioPorCodigo)
    .delete(verificaJWT, deletarUsuario)

module.exports = rotasUsuarios;