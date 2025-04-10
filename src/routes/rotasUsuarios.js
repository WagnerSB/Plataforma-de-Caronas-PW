const { Router } = require('express');
const { getUsuarios } = require('../controllers/usuarioController')

const rotasUsuarios = new Router();

rotasUsuarios.route('/usuario')
    .get(getUsuarios)


module.exports = rotasUsuarios;