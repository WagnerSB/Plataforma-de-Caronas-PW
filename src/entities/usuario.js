class Usuario {
    constructor (codigo, nome, telefone, email, is_motorista = false){
        this.codigo = codigo;
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
        this.is_motorista = is_motorista;
    }
}

module.exports = Usuario;