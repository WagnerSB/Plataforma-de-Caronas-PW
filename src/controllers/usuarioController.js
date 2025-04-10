const { getUsuariosDB, addUsuarioDB, updateUsuarioDB, getUsuarioPorCodigoDB, deletarUsuarioDB } = require('../usecases/usuarioUseCases')


const getUsuarios = async (request, response) => {
    await getUsuariosDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: `Erro ao buscar usuários: ${err}`
        }))
}

const addUsuario = async (request, response) => {
    await addUsuarioDB(request.body)
        .then(data => response.status(200).json({
            status: 'success',
            message: 'Usuário criado com sucesso',
            objeto: data
        }))
        .catch(err =>
            response.status(400).json({
                status: 'error',
                message: `Erro ao criar usuário: ${err}`
            })
        )
}

const updateUsuario = async (request, response) => {
    await updateUsuarioDB(request.body)
        .then(data => response.status(200).json({
            status: 'success',
            message: 'Usuário atualizado com sucesso',
            objeto: data
        }))
        .catch(err =>
            response.status(400).json({
                status: 'error',
                message: `Erro ao atualizar usuário: ${err}`
            })
        )
}

const getUsuarioPorCodigo = async (request, response) => {
    await getUsuarioPorCodigoDB(request.params.codigo)
        .then(data => response.status(200).json(data))
        .catch(err =>
            response.status(400).json({
                status: 'error',
                message: `Erro ao buscar usuário: ${err}`
            })
        )
}

const deletarUsuario = async (request, response) => {
    await deletarUsuarioDB(request.params.codigo)
        .then(data => response.status(200).json({
            status: 'success',
            message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: `Erro ao deletar usuário: ${err}`
        })
        );
}

module.exports = { getUsuarios, addUsuario, updateUsuario, getUsuarioPorCodigo, deletarUsuario }