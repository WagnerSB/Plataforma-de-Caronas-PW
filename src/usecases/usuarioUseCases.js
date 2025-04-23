const { pool } = require('../config');
const Usuario = require('../entities/usuario');


const getUsuariosDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * from usuarios ORDER BY nome');
        return rows.map((usuario) => new Usuario(usuario.codigo, usuario.nome, usuario.telefone,
            usuario.email, usuario.is_motorista));
    } catch (err) {
        throw err;
    };
};

const addUsuarioDB = async (body) => {
    try {
        const { nome, telefone, email, is_motorista } = body;
        const results = await pool.query(`INSERT INTO usuarios (nome, telefone, email, is_motorista) 
            VALUES ($1, $2, $3, $4)
            RETURNING codigo, nome, telefone, email, is_motorista`,
            [nome, telefone, email, is_motorista]);
        const usuario = results.rows[0];
        return new Usuario(usuario.codigo, usuario.nome, usuario.telefone, usuario.email, usuario.is_motorista);
    } catch (err) {
        throw `Erro ao adicionar usuário: ${err}`;
    }
};

const updateUsuarioDB = async (body) => {
    try {
        const { codigo, nome, telefone, email, is_motorista } = body;

        if (is_motorista == false) {
            const motoristaCheck = await pool.query(`SELECT 1 FROM caronas WHERE codigo_motorista = $1 LIMIT 1`, [codigo]);

            if (motoristaCheck.rowCount > 0) 
                throw new Error(`Não é possível remover o status de motorista. O usuário já foi motorista de uma carona.`);

        }
        
        results = await pool.query(`UPDATE usuarios SET nome = $1,
            telefone = $2, email = $3, is_motorista = $4
            WHERE codigo = $5
            RETURNING codigo, nome, telefone, email, is_motorista`,
            [nome, telefone, email, is_motorista, codigo]
        );
        const usuario = results.rows[0];
        return new Usuario(usuario.codigo, usuario.nome, usuario.telefone, usuario.email, usuario.is_motorista);
    } catch (err) {
        throw `Erro ao atualizar usuário: ${err}`;
    }
};

const getUsuarioPorCodigoDB = async (codigo) => {
    const results = await pool.query('SELECT * from usuarios WHERE codigo = $1 ORDER BY nome', [codigo]);
    if (results.rowCount == 0) {
        throw `Nenhum usuário encontrado com o código: ${codigo}`;
    } else {
        const usuario = results.rows[0];
        return new Usuario(usuario.codigo, usuario.nome, usuario.telefone, usuario.email, usuario.is_motorista);
    }
}

const deletarUsuarioDB = async (codigo) => {
    try {
        const results = await pool.query('DELETE FROM usuarios WHERE codigo = $1', [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum usuário encontrado com o código: ${codigo}`;
        } else {
            return "Usuário deletado com sucesso"
        }

    } catch (err) {
        throw `Erro ao deletar usuário: ${err}`
    }
}

module.exports = { getUsuariosDB, addUsuarioDB, updateUsuarioDB, getUsuarioPorCodigoDB, deletarUsuarioDB };