const { getAvaliacoesDB, addAvaliacaoDB, updateAvaliacaoDB, getAvaliacaoPorCodigoDB, deletarAvaliacaoDB } = require('../usecases/avaliacaoUseCases')


const getAvaliacoes = async (request, response) => {
    await getAvaliacoesDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: `Erro ao buscar avaliações: ${err}`
        }))
}

const addAvaliacao = async (request, response) => {
    await addAvaliacaoDB(request.body)
        .then(data => response.status(200).json({
            status: 'success',
            message: 'Avaliação criada com sucesso',
            objeto: data
        }))
        .catch(err =>
            response.status(400).json({
                status: 'error',
                message: `Erro ao criar avaliação: ${err}`
            })
        )
}

const updateAvaliacao = async (request, response) => {
    await updateAvaliacaoDB(request.body)
        .then(data => response.status(200).json({
            status: 'success',
            message: 'Avaliação atualizada com sucesso',
            objeto: data
        }))
        .catch(err =>
            response.status(400).json({
                status: 'error',
                message: `Erro ao atualizar avaliação: ${err}`
            })
        )
}

const getAvaliacaoPorCodigo = async (request, response) => {
    await getAvaliacaoPorCodigoDB(request.params.codigo)
        .then(data => response.status(200).json(data))
        .catch(err =>
            response.status(400).json({
                status: 'error',
                message: `Erro ao buscar avaliação: ${err}`
            })
        )
}

const deletarAvaliacao = async (request, response) => {
    await deletarAvaliacaoDB(request.params.codigo)
        .then(data => response.status(200).json({
            status: 'success',
            message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: `Erro ao deletar avaliação: ${err}`
        })
        );
}

module.exports = { getAvaliacoes, addAvaliacao, updateAvaliacao, getAvaliacaoPorCodigo, deletarAvaliacao }