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
        const results = await pool.query(`INSERT INTO caronas (codigo_motorista, origem, destino, horario, horario_chegada, vagas, vagas_ocupadas, status_carona) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING codigo, codigo_motorista, origem, destino, horario, horario_chegada, vagas, vagas_ocupadas, status_carona`,
            [codigo_motorista, origem, destino, horario, horario_chegada, vagas, vagas_ocupadas, status_carona]);
        const carona = results.rows[0];
        return new Carona(carona.codigo, carona.codigo_motorista, carona.origem, carona.destino, carona.horario, carona.horario_chegada, carona.vagas, carona.vagas_ocupadas, carona.status_carona, "");
    } catch (err) {
        throw `Erro ao adicionar carona: ${err}`;
    }
};

const updateCaronaDB = async (body) => {
    try {
        const { codigo, codigo_motorista, origem, destino, horario, horario_chegada, vagas, vagas_ocupadas, status_carona } = body;
        results = await pool.query(`UPDATE caronas SET codigo_motorista = $1, origem = $2, destino = $3, 
            horario = $4, horario_chegada = $5, vagas = $6, vagas_ocupadas = $7, status_carona = $8
            WHERE codigo = $9
            RETURNING codigo, codigo_motorista, origem, destino, horario, horario_chegada, vagas, vagas_ocupadas, status_carona`,
            [codigo_motorista, origem, destino, horario, horario_chegada, vagas, vagas_ocupadas, status_carona, codigo]
        );
        const carona = results.rows[0];
        return new Carona(carona.codigo, carona.codigo_motorista, carona.origem, carona.destino, carona.horario, 
            carona.horario_chegada, carona.vagas, carona.vagas_ocupadas, carona.status_carona, "");
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
            carona.horario_chegada, carona.vagas, carona.vagas_ocupadas, carona.status_carona, "");
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