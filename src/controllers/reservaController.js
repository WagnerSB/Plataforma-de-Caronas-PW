const { getReservasDB, addReservaDB, updateReservaDB, getReservaPorCodigoDB, deletarReservaDB, getUsuariosDisponiveisDB } = require('../usecases/reservaUseCases')


const getReservas = async (request, response) => {
    await getReservasDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: `Erro ao buscar reservas: ${err}`
        }))
}

const addReserva = async (request, response) => {
    await addReservaDB(request.body)
        .then(data => response.status(200).json({
            status: 'success',
            message: 'Reserva criada com sucesso',
            objeto: data
        }))
        .catch(err =>
            response.status(400).json({
                status: 'error',
                message: `Erro ao criar reserva: ${err}`
            })
        )
}

const updateReserva = async (request, response) => {
    await updateReservaDB(request.body)
        .then(data => response.status(200).json({
            status: 'success',
            message: 'Reserva atualizada com sucesso',
            objeto: data
        }))
        .catch(err =>
            response.status(400).json({
                status: 'error',
                message: `Erro ao atualizar reserva: ${err}`
            })
        )
}

const getReservaPorCodigo = async (request, response) => {
    await getReservaPorCodigoDB(request.params.codigo)
        .then(data => response.status(200).json(data))
        .catch(err =>
            response.status(400).json({
                status: 'error',
                message: `Erro ao buscar reserva: ${err}`
            })
        )
}

const deletarReserva = async (request, response) => {
    await deletarReservaDB(request.params.codigo)
        .then(data => response.status(200).json({
            status: 'success',
            message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: `Erro ao deletar reserva: ${err}`
        })
        );
}

const getUsuariosDisponiveis = async (request, response) => {
    await getUsuariosDisponiveisDB (request.params.codigo_carona)
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: `Erro ao buscar usuários disponíveis: ${err}`
        }))
}

module.exports = { getReservas, addReserva, updateReserva, getReservaPorCodigo, deletarReserva, getUsuariosDisponiveis }