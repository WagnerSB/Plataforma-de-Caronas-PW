const { pool } = require('../config');
const Avaliacao = require('../entities/avaliacao');


const getAvaliacoesDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT a.codigo, a.codigo_usuario, a.codigo_carona, a.nota, a.comentario, u.nome as nome_usuario 
            FROM avaliacoes a
            JOIN usuarios u on a.codigo_usuario = u.codigo
            ORDER BY codigo`);
        return rows.map((avaliacao) => new Avaliacao(avaliacao.codigo, avaliacao.codigo_usuario, avaliacao.codigo_carona, avaliacao.nota, avaliacao.comentario, avaliacao.nome_usuario));
    } catch (err) {
        throw err;
    };
};

const addAvaliacaoDB = async (body) => {
    try {
        const { codigo_usuario, codigo_carona, nota, comentario } = body;
        const results = await pool.query(`INSERT INTO avaliacoes (codigo_usuario, codigo_carona, nota, comentario) 
            VALUES ($1, $2, $3, $4)
            RETURNING codigo, codigo_usuario, codigo_carona, nota, comentario`,
            [codigo_usuario, codigo_carona, nota, comentario]);
        const avaliacao = results.rows[0];
        return new Avaliacao(avaliacao.codigo, avaliacao.codigo_usuario, avaliacao.codigo_carona, avaliacao.nota, avaliacao.comentario);
    } catch (err) {
        throw `Erro ao adicionar avaliação: ${err}`;
    }
};

const updateAvaliacaoDB = async (body) => {
    try {
        const { codigo, codigo_usuario, codigo_carona, nota, comentario } = body;
        results = await pool.query(`UPDATE avaliacoes SET codigo_usuario = $1, codigo_carona = $2, nota = $3, comentario = $4
            WHERE codigo = $5
            RETURNING codigo, codigo_usuario, codigo_carona, nota, comentario`,
            [codigo_usuario, codigo_carona, nota, comentario, codigo]
        );
        const avaliacao = results.rows[0];
        return new Avaliacao(avaliacao.codigo, avaliacao.codigo_usuario, avaliacao.codigo_carona, avaliacao.nota, avaliacao.comentario);
    } catch (err) {
        throw `Erro ao atualizar avaliação: ${err}`;
    }
};

const getAvaliacaoPorCodigoDB = async (codigo) => {
    const results = await pool.query(`SELECT a.codigo, a.codigo_usuario, a.codigo_carona, a.nota, a.comentario, u.nome as nome_usuario 
            FROM avaliacoes a
            JOIN usuarios u on a.codigo_usuario = u.codigo
            WHERE a.codigo = $1`, [codigo]);
    if (results.rowCount == 0) {
        throw `Nenhuma avaliação encontrado com o código: ${codigo}`;
    } else {
        const avaliacao = results.rows[0];
        return new Avaliacao(avaliacao.codigo, avaliacao.codigo_usuario, avaliacao.codigo_carona, avaliacao.nota, avaliacao.comentario, avaliacao.nome_usuario);
    }
}

const deletarAvaliacaoDB = async (codigo) => {
    try {
        const results = await pool.query('DELETE FROM avaliacoes WHERE codigo = $1', [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhuma avaliação encontrada com o código: ${codigo}`;
        } else {
            return "Avaliação deletada com sucesso"
        }

    } catch (err) {
        throw `Erro ao deletar avaliação: ${err}`
    }
}

module.exports = { getAvaliacoesDB, addAvaliacaoDB, updateAvaliacaoDB, getAvaliacaoPorCodigoDB, deletarAvaliacaoDB };