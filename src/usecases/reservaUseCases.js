const { pool } = require('../config');
const Reserva = require('../entities/reserva');


const getReservasDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT r.codigo, r.codigo_carona, r.codigo_usuario, u.nome AS nome_passageiro, m.nome AS nome_motorista 
        FROM reservas r 
        JOIN usuarios u ON r.codigo_usuario = u.codigo
        JOIN caronas c ON r.codigo_carona = c.codigo
        JOIN usuarios m ON c.codigo_motorista = m.codigo
        ORDER BY r.codigo_carona`);

        return rows.map((reserva) => new Reserva(reserva.codigo, reserva.codigo_carona, reserva.codigo_usuario, reserva.nome_passageiro, reserva.nome_motorista));
    } catch (err) {
        throw err;
    };
};

const addReservaDB = async (body) => {
    try {
        const { codigo_carona, codigo_usuario } = body;
        const results = await pool.query(`INSERT INTO reservas (codigo_carona, codigo_usuario) 
            VALUES ($1, $2)
            RETURNING codigo, codigo_carona, codigo_usuario`,
            [codigo_carona, codigo_usuario]);
        const reserva = results.rows[0];
        return new Reserva(reserva.codigo, reserva.codigo_carona, reserva.codigo_usuario);
    } catch (err) {
        throw `Erro ao adicionar reserva: ${err}`;
    }
};

const updateReservaDB = async (body) => {
    try {
        const { codigo, codigo_carona, codigo_usuario } = body;
        results = await pool.query(`UPDATE reservas SET codigo_carona = $1, codigo_usuario = $2
            WHERE codigo = $3
            RETURNING codigo, codigo_carona, codigo_usuario`,
            [codigo_carona, codigo_usuario, codigo]
        );
        const reserva = results.rows[0];
        return new Reserva(reserva.codigo, reserva.codigo_carona, reserva.codigo_usuario);
    } catch (err) {
        throw `Erro ao atualizar reserva: ${err}`;
    }
};

const getReservaPorCodigoDB = async (codigo) => {
    const results = await pool.query(`SELECT r.codigo, r.codigo_carona, r.codigo_usuario, u.nome AS nome_passageiro, m.nome AS nome_motorista 
        FROM reservas r 
        JOIN usuarios u ON r.codigo_usuario = u.codigo
        JOIN caronas c ON r.codigo_carona = c.codigo
        JOIN usuarios m ON c.codigo_motorista = m.codigo
        WHERE r.codigo = $1
        ORDER BY r.codigo_carona
        `, [codigo]);
    if (results.rowCount == 0) {
        throw `Nenhuma reserva encontrado com o código: ${codigo}`;
    } else {
        const reserva = results.rows[0];
        return new Reserva(reserva.codigo, reserva.codigo_carona, reserva.codigo_usuario, reserva.nome_passageiro, reserva.nome_motorista);
    }
}

const deletarReservaDB = async (codigo) => {
    try {
        const results = await pool.query('DELETE FROM reservas WHERE codigo = $1', [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhuma reserva encontrada com o código: ${codigo}`;
        } else {
            return "Reserva deletada com sucesso"
        }

    } catch (err) {
        throw `Erro ao deletar reserva: ${err}`
    }
}

module.exports = { getReservasDB, addReservaDB, updateReservaDB, getReservaPorCodigoDB, deletarReservaDB };