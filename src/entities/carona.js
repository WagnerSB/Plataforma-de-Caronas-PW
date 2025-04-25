class Carona {
    constructor (codigo, codigo_motorista, origem, destino, horario, horario_chegada, vagas, vagas_ocupadas, status_carona, nome_motorista = ''){
        this.codigo = codigo;
        this.codigo_motorista = codigo_motorista;
        this.origem = origem;
        this.destino = destino;
        this.horario = horario;
        this.horario_chegada = horario_chegada;
        this.vagas = vagas;
        this.vagas_ocupadas = vagas_ocupadas;
        this.status_carona = status_carona;
        this.nome_motorista = nome_motorista;
    }
}

module.exports = Carona;