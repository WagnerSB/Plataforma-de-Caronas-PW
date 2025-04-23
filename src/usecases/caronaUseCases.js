const { pool } = require('../config');
const Carona = require('../entities/carona');


const getCaronasDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT c.codigo, c.codigo_motorista, c.origem, c.destino, 
            to_char(c.horario, 'DD/MM/YYYY HH24:MI') as horario, to_char(c.horario_chegada, 'DD/MM/YYYY HH24:MI') as horario_chegada,
            c.vagas, c.vagas_ocupadas, c.status_carona, u.nome as nome_motorista
            FROM caronas c
			JOIN usuarios u on c.codigo_motorista = u.codigo 
            ORDER BY c.horario`);

        return rows.map((carona) => new Carona(carona.codigo, carona.codigo_motorista, carona.origem, carona.destino,
            carona.horario, carona.horario_chegada,
            carona.vagas, carona.vagas_ocupadas, carona.status_carona, carona.nome_motorista));
    } catch (err) {
        throw err;
    };
};

const addCaronaDB = async (body) => {
    try {
        const { codigo_motorista, origem, destino, horario, horario_chegada, vagas, vagas_ocupadas, status_carona } = body;

        const motorista = await pool.query(
            `SELECT nome FROM usuarios WHERE codigo = $1 AND is_motorista = true`,
            [codigo_motorista]
        );

        if (motorista.rowCount === 0) {
            throw new Error(`Usuário ${codigo_motorista} não é um motorista válido.`);
        }

        // Validar a quantidade de vagas ocupadas com base nas reservas
        const vagasOcupadas = await pool.query(
            `SELECT COUNT(*) AS total FROM reservas WHERE codigo_carona = $1`,
            [codigo]
        );
        const totalOcupadas = parseInt(vagasOcupadas.rows[0].total);

        const results = await pool.query(`INSERT INTO caronas (codigo_motorista, origem, destino, horario, horario_chegada, vagas, vagas_ocupadas, status_carona) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING codigo, codigo_motorista, origem, destino, to_char(horario, 'DD/MM/YYYY HH24:MI') as horario, to_char(horario_chegada, 'DD/MM/YYYY HH24:MI') as horario_chegada, vagas, vagas_ocupadas, status_carona`,
            [codigo_motorista, origem, destino, horario, horario_chegada, vagas, totalOcupadas, status_carona]);
        const carona = results.rows[0];
        return new Carona(carona.codigo, carona.codigo_motorista, carona.origem, carona.destino, carona.horario, carona.horario_chegada, carona.vagas, carona.vagas_ocupadas, carona.status_carona, motorista.rows[0].nome || '');
    } catch (err) {
        throw `Erro ao adicionar carona: ${err}`;
    }
};

const updateCaronaDB = async (body) => {
    try {
        const { codigo, codigo_motorista, origem, destino, horario, horario_chegada, vagas, vagas_ocupadas, status_carona } = body;

        const motorista = await pool.query(
            `SELECT nome FROM usuarios WHERE codigo = $1 AND is_motorista = true`,
            [codigo_motorista]
        );

        if (motorista.rowCount === 0) {
            throw new Error(`Usuário ${codigo_motorista} não é um motorista válido.`);
        }

        // Validar a quantidade de vagas ocupadas com base nas reservas
        const vagasOcupadas = await pool.query(
            `SELECT COUNT(*) AS total FROM reservas WHERE codigo_carona = $1`,
            [codigo]
        );
        const totalOcupadas = parseInt(vagasOcupadas.rows[0].total);

        results = await pool.query(`UPDATE caronas SET codigo_motorista = $1, origem = $2, destino = $3, 
            horario = $4, horario_chegada = $5, vagas = $6, vagas_ocupadas = $7, status_carona = $8
            WHERE codigo = $9
            RETURNING codigo, codigo_motorista, origem, destino, to_char(horario, 'DD/MM/YYYY HH24:MI') as horario, to_char(horario_chegada, 'DD/MM/YYYY HH24:MI') as horario_chegada, vagas, vagas_ocupadas, status_carona`,
            [codigo_motorista, origem, destino, horario, horario_chegada, vagas, totalOcupadas, status_carona, codigo]
        );
        const carona = results.rows[0];
        return new Carona(carona.codigo, carona.codigo_motorista, carona.origem, carona.destino, carona.horario,
            carona.horario_chegada, carona.vagas, carona.vagas_ocupadas, carona.status_carona, motorista.rows[0].nome || '');
    } catch (err) {
        throw `Erro ao atualizar carona: ${err}`;
    }
};

const getCaronaPorCodigoDB = async (codigo) => {
    const results = await pool.query(`SELECT c.codigo, c.codigo_motorista, c.origem, c.destino, 
            to_char(c.horario, 'DD/MM/YYYY HH24:MI') as horario, to_char(c.horario_chegada, 'DD/MM/YYYY HH24:MI') as horario_chegada,
            c.vagas, c.vagas_ocupadas, c.status_carona, u.nome as nome_motorista
            FROM caronas c
			JOIN usuarios u on c.codigo_motorista = u.codigo
            WHERE c.codigo = $1`, [codigo]);
    if (results.rowCount == 0) {
        throw `Nenhuma carona encontrado com o código: ${codigo}`;
    } else {
        const carona = results.rows[0];
        return new Carona(carona.codigo, carona.codigo_motorista, carona.origem, carona.destino, carona.horario,
            carona.horario_chegada, carona.vagas, carona.vagas_ocupadas, carona.status_carona, carona.nome_motorista);
    }
}

const deletarCaronaDB = async (codigo) => {
    try {
        const results = await pool.query('DELETE FROM caronas WHERE codigo = $1', [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhuma carona encontrada com o código: ${codigo}`;
        } else {
            return "Carona deletada com sucesso"
        }

    } catch (err) {
        throw `Erro ao deletar carona: ${err}`
    }
}

module.exports = { getCaronasDB, addCaronaDB, updateCaronaDB, getCaronaPorCodigoDB, deletarCaronaDB };