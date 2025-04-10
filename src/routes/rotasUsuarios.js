const { Router } = require('express');
const { getUsuarios, addUsuario, updateUsuario, getUsuarioPorCodigo, deletarUsuario } = require('../controllers/usuarioController')

const rotasUsuarios = new Router();

rotasUsuarios.route('/usuario')
    .get(getUsuarios)
    .post(addUsuario)
    .put(updateUsuario);

rotasUsuarios.route('/usuario/:codigo')
    .get(getUsuarioPorCodigo)
    .delete(deletarUsuario)

module.exports = rotasUsuarios;