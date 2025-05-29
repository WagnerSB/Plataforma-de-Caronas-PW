import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { gravaAutenticacao, getToken } from '../../../seguranca/Autenticacao';
import Carregando from '../../../utils/Carregando'
import Alerta from '../../../utils/Alerta';
import CampoEntrada from '../../../utils/CampoEntrada';
import CampoSelect from '../../../utils/CampoSelect';

function Login() {

    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [is_motorista, setIs_motorista] = useState(false);
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [autenticado, setAutenticado] = useState(false);
    const [carregando, setCarregando] = useState(false);

    const acaoRegistro = async e => {

        e.preventDefault();

        try {
            const body = {
                nome: nome,
                telefone: telefone,
                email: email,
                senha: senha,
                is_motorista: is_motorista

            };
            setCarregando(true);

            await fetch(`${process.env.REACT_APP_API_URL}/usuario`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }).then(response => response.json())
                .then(setAutenticado(true));
        } catch (err) {
            console.error(err.message);
            setAlerta({ status: "error", message: err.message })
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        try {
            const token = getToken();
            if (token != null) {
                setAutenticado(true);
            }
        } catch (err) {
            setAlerta({ status: "error", message: err != null ? err.message : "" });
        }
    }, []);

    if (autenticado === true) {
        return <Navigate to="/login" />
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <Carregando carregando={carregando}>
                        <Alerta alerta={alerta} />
                        <form onSubmit={acaoRegistro}>
                            <h1 className="h3 mb-3 fw-normal">Registro de usuário</h1>
                            <CampoEntrada value={nome}
                                id="txtNome" name="nome" label="Nome"
                                tipo="text" onchange={e => setNome(e.target.value)}
                                msgvalido="Nome OK" msginvalido="Informe o seu nome"
                                requerido={true} readonly={false}
                                maxCaracteres={40} />
                            <CampoEntrada value={telefone}
                                id="txtTelefone" name="telefone" label="Telefone"
                                tipo="text" onchange={e => setTelefone(e.target.value)}
                                msgvalido="Telefone OK" msginvalido="Informe o seu telefone"
                                requerido={true} readonly={false}
                                maxCaracteres={40} />
                            <CampoEntrada value={email}
                                id="txtEmail" name="email" label="Email"
                                tipo="email" onchange={e => setEmail(e.target.value)}
                                msgvalido="Email OK" msginvalido="Informe o email"
                                requerido={true} readonly={false}
                                maxCaracteres={40} />
                            <CampoEntrada value={senha}
                                id="txtSenha" name="senha" label="Senha"
                                tipo="password" onchange={e => setSenha(e.target.value)}
                                msgvalido="Senha OK" msginvalido="Informe a senha"
                                requerido={true} readonly={false}
                                maxCaracteres={40} />
                            <CampoSelect value={is_motorista}
                                id="txtIs_Motorista" name="is_motorista" label="É Motorista"
                                onchange={e => setIs_motorista(e.target.value)}
                                msgvalido="É Motorista OK" msginvalido="Informe se é ou não motorista"
                                requerido={true}>
                                <option key={"nao"} value={false}>{"Não"}</option>
                                <option key={"sim"} value={true}>{"Sim"}</option>

                            </CampoSelect>
                            <button className="w-100 btn btn-lg btn-primary" type="submit">Criar conta</button>
                        </form>
                    </Carregando>
                </div>
            </div>
        </div>
    )

}

export default Login;