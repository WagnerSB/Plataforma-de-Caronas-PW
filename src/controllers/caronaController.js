const { getCaronasDB, addCaronaDB, updateCaronaDB, getCaronaPorCodigoDB, deletarCaronaDB } = require('../usecases/caronaUseCases')


const getCaronas = async (request, response) => {
    await getCaronasDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: `Erro ao buscar caronas: ${err}`
        }))
}

const addCarona = async (request, response) => {
    await addCaronaDB(request.body)
        .then(data => response.status(200).json({
            status: 'success',
            message: 'Carona criada com sucesso',
            objeto: data
        }))
        .catch(err =>
            response.status(400).json({
                status: 'error',
                message: `Erro ao criar carona: ${err}`
            })
        )
}

const updateCarona = async (request, response) => {
    await updateCaronaDB(request.body)
        .then(data => response.status(200).json({
            status: 'success',
            message: 'Carona atualizada com sucesso',
            objeto: data
        }))
        .catch(err =>
            response.status(400).json({
                status: 'error',
                message: `Erro ao atualizar carona: ${err}`
            })
        )
}

const getCaronaPorCodigo = async (request, response) => {
    await getCaronaPorCodigoDB(request.params.codigo)
        .then(data => response.status(200).json(data))
        .catch(err =>
            response.status(400).json({
                status: 'error',
                message: `Erro ao buscar carona: ${err}`
            })
        )
}

const deletarCarona = async (request, response) => {
    await deletarCaronaDB(request.params.codigo)
        .then(data => response.status(200).json({
            status: 'success',
            message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: `Erro ao deletar carona: ${err}`
        })
        );
}

module.exports = { getCaronas, addCarona, updateCarona, getCaronaPorCodigo, deletarCarona }