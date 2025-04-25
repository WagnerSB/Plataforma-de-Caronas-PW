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

        await validarReserva(codigo_carona, codigo_usuario);

        const results = await pool.query(`INSERT INTO reservas (codigo_carona, codigo_usuario) 
            VALUES ($1, $2)
            RETURNING codigo, codigo_carona, codigo_usuario`,
            [codigo_carona, codigo_usuario]);
        const reserva = results.rows[0];
        atualizarVagasOcupadas(codigo_carona);
        return new Reserva(reserva.codigo, reserva.codigo_carona, reserva.codigo_usuario);
    } catch (err) {
        throw `Erro ao adicionar reserva: ${err}`;
    }
};

const updateReservaDB = async (body) => {
    try {
        const { codigo, codigo_carona, codigo_usuario } = body;

        await validarReserva(codigo_carona, codigo_usuario, codigo);

        results = await pool.query(`UPDATE reservas SET codigo_carona = $1, codigo_usuario = $2
            WHERE codigo = $3
            RETURNING codigo, codigo_carona, codigo_usuario`,
            [codigo_carona, codigo_usuario, codigo]
        );
        const reserva = results.rows[0];
        atualizarVagasOcupadas(codigo_carona);
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
        const reservaResult = await pool.query(`SELECT codigo_carona FROM reservas WHERE codigo = $1`, [codigo]);
        if (reservaResult.rowCount === 0)
            throw `Nenhuma reserva encontrada com o código: ${codigo}`;

        const codigo_carona = reservaResult.rows[0].codigo_carona;
        const results = await pool.query(`DELETE FROM reservas WHERE codigo = $1`, [codigo]);
        await atualizarVagasOcupadas(codigo_carona);

        return "Reserva deletada com sucesso"

    } catch (err) {
        throw `Erro ao deletar reserva: ${err}`
    }
}


const getUsuariosDisponiveisDB = async (codigo_carona) => {
    try {
      const { rows } = await pool.query(`
        SELECT u.codigo, u.nome
        FROM usuarios u
        WHERE u.codigo NOT IN (
            SELECT r.codigo_usuario
            FROM reservas r
            WHERE r.codigo_carona = $1
        )
        AND u.codigo != (
            SELECT c.codigo_motorista
            FROM caronas c
            WHERE c.codigo = $1
        )
        ORDER BY u.nome;
      `, [codigo_carona]);
  
      return rows.map(usuario => ({ codigo: usuario.codigo, nome: usuario.nome }));
    } catch (err) {
      throw err;
    }
  };


const validarReserva = async (codigo_carona, codigo_usuario, codigo_reserva = null) => {
    const carona = await pool.query(`SELECT codigo_motorista, vagas FROM caronas WHERE codigo = $1`, [codigo_carona]);
    if (carona.rowCount == 0)
        throw new Error('Carona não encontrada.');

    const { codigo_motorista, vagas } = carona.rows[0];

    if (codigo_motorista == codigo_usuario)
        throw new Error('O motorista não pode fazer reserva na própria carona.');

    const reserva = await pool.query(
        `SELECT COUNT(*) AS total FROM reservas WHERE codigo_carona = $1`,
        [codigo_carona]
    );
    let reservasTotais = parseInt(reserva.rows[0].total);

    if (codigo_reserva) {
        const reservaExistente = await pool.query(
            `SELECT codigo_usuario FROM reservas WHERE codigo = $1 AND codigo_carona = $2`,
            [codigo_reserva, codigo_carona]
        );

        if (reservaExistente.rowCount > 0) {
            reservasTotais -= 1;
        }
    }

    if (reservasTotais >= vagas) {
        throw new Error(`A carona já está cheia. (${reservasTotais}/${vagas} vagas ocupadas)`);
    }
}

const atualizarVagasOcupadas = async (codigo_carona) => {
    const result = await pool.query(`SELECT COUNT(*) AS total FROM reservas WHERE codigo_carona = $1`, [codigo_carona]);
    const total = parseInt(result.rows[0].total);

    await pool.query(`UPDATE caronas SET vagas_ocupadas = $1 WHERE codigo = $2`, [total, codigo_carona]);
};

module.exports = { getReservasDB, addReservaDB, updateReservaDB, getReservaPorCodigoDB, deletarReservaDB, getUsuariosDisponiveisDB };