class Avaliacao {
    constructor (codigo, codigo_usuario, codigo_carona, nota, comentario = "", nome_usuario=""){
        this.codigo = codigo;
        this.codigo_usuario = codigo_usuario;
        this.codigo_carona = codigo_carona;
        this.nota = nota;
        this.comentario = comentario;
        this.nome_usuario = nome_usuario;
    }
}

module.exports = Avaliacao;