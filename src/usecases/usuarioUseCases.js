const { pool } = require('../config');
const Usuario = require('../entities/usuario');


const getUsuariosDB = async () => {
    try {
        const {rows} = await pool.query('SELECT * from usuarios');
        return rows.map((usuario) => new Usuario(usuario.codigo, usuario.nome, usuario.telefone, 
            usuario.email || "Sem email", usuario.is_motorista));
    } catch (err) {
        throw err;
    };
};

module.exports = { getUsuariosDB };