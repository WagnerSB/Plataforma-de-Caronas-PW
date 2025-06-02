const { pool } = require('../config')
const Usuario = require('../entities/usuario')

const autenticaUsuarioDB = async (body) => {
    try {
        const { email, senha } = body;
        const results = await pool.query(`SELECT * FROM usuarios WHERE email = $1 and senha = $2`,
            [email, senha]
        );
        if (results.rowCount == 0) {
            throw "Usuário ou senha inválidos";
        }
        const usuario = results.rows[0];
        return new Usuario(usuario.codigo, usuario.nome, usuario.telefone, usuario.email, usuario.is_motorista, usuario.tipo);
    } catch (err) {
        throw "Erro ao autenticar o usuário: " + err;
    }
}

module.exports = { autenticaUsuarioDB };