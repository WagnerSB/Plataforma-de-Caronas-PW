const { Router } = require('express');
const { getAvaliacoes, addAvaliacao, updateAvaliacao, getAvaliacaoPorCodigo, deletarAvaliacao, getUsuariosAvaliacao } = require('../controllers/avaliacaoController')

const { verificaJWT } = require('../controllers/segurancaController');

const rotasAvaliacoes = new Router();

rotasAvaliacoes.route('/avaliacao')
    .get(verificaJWT, getAvaliacoes)
    .post(verificaJWT, addAvaliacao)
    .put(verificaJWT, updateAvaliacao);

rotasAvaliacoes.route('/avaliacao/:codigo')
    .get(verificaJWT, getAvaliacaoPorCodigo)
    .delete(verificaJWT, deletarAvaliacao);
    
rotasAvaliacoes.route('/usuariosAvaliacao/:codigo')
    .get(verificaJWT, getUsuariosAvaliacao);

module.exports = rotasAvaliacoes;