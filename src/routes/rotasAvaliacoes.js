const { Router } = require('express');
const { getAvaliacoes, addAvaliacao, updateAvaliacao, getAvaliacaoPorCodigo, deletarAvaliacao, getUsuariosAvaliacao } = require('../controllers/avaliacaoController')

const rotasAvaliacoes = new Router();

rotasAvaliacoes.route('/avaliacao')
    .get(getAvaliacoes)
    .post(addAvaliacao)
    .put(updateAvaliacao);

rotasAvaliacoes.route('/avaliacao/:codigo')
    .get(getAvaliacaoPorCodigo)
    .delete(deletarAvaliacao);
    
rotasAvaliacoes.route('/usuariosAvaliacao/:codigo')
    .get(getUsuariosAvaliacao);

module.exports = rotasAvaliacoes;