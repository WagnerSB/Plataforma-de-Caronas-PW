const { getUsuariosDB } = require('../usecases/usuarioUseCases')


const getUsuarios = async (require, response) => {
    await getUsuariosDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'Error',
            message: `Erro ao buscar usuários: ${err}`
        }))
}

module.exports = { getUsuarios }