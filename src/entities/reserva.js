class Reserva {
    constructor (codigo, codigo_carona, codigo_usuario, nome_passageiro = "", nome_motorista = ""){
        this.codigo = codigo;
        this.codigo_carona = codigo_carona;
        this.codigo_usuario = codigo_usuario;
        this.nome_passageiro = nome_passageiro;
        this.nome_motorista = nome_motorista;
    }
}

module.exports = Reserva;