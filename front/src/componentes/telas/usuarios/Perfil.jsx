import { useContext, useState, useEffect } from "react";
import { getObjetoPorCodigoAPI, adicionarObjetoAPI } from '../../../servicos/BasicoServicos'


import { getUsuario } from "../../../seguranca/Autenticacao";
import { useNavigate } from "react-router-dom";
import Alerta from "../../../utils/Alerta";
import CampoEntrada from "../../../utils/CampoEntrada";
import CampoSelect from "../../../utils/CampoSelect";
import Col from 'react-bootstrap/Col';
import { gravaAutenticacao } from "../../../seguranca/Autenticacao";


function Perfil() {
    const navigate = useNavigate();
    const nomeObjeto = 'usuario';
    const [alerta, setAlerta] = useState({ status: "", message: "" });

    const [usuario, setUsuario] = useState({
        'codigo': 0,
        'nome': '',
        'telefone': '',
        'email': '',
        'is_motorista': false
    });
    useEffect(() => {
        const dadosUsuario = getUsuario();
        setUsuario(dadosUsuario);
    }, [])
    const [objeto, setObjeto] = useState({
        'codigo': 0,
        'nome': '',
        'telefone': '',
        'email': '',
        'is_motorista': false,
        'senha': ""
    })

    useEffect(() => {
        if (usuario == null) navigate('/login');

        setObjeto({
            'codigo': usuario.codigo,
            'nome': usuario.nome,
            'telefone': usuario.telefone,
            'email': usuario.email,
            'is_motorista': usuario.is_motorista,
            'senha': ""
        })
    }, [usuario]);

    const cadastrarObjeto = async e => {
        e.preventDefault();
        const metodo = "PUT";
        try {
            const apiResult = await adicionarObjetoAPI(nomeObjeto, objeto, metodo);
            setAlerta({ status: apiResult.status, message: apiResult.message });
            if (apiResult.status === 'error') {
                return;
            }

            const password = objeto.senha;
            setObjeto({ ...apiResult.objeto, senha: password });


            await fetch(`${process.env.REACT_APP_API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: objeto.email, senha: objeto.senha }),
            }).then(response => response.json())
                .then(json => {
                    if (json.auth === false) {
                        setAlerta({ status: "error", message: json.message })
                    }
                    if (json.auth === true) {
                        gravaAutenticacao(json);
                    }
                });


        } catch (err) {
            console.error(err.message);
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setObjeto({ ...objeto, [name]: value });

    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <Alerta alerta={alerta} />
                    <form onSubmit={cadastrarObjeto}>
                        <h1 className="h3 mb-3 fw-normal">Editar Perfil</h1>
                        <Col xs={12} md={12}>
                            <CampoEntrada value={objeto.codigo}
                                id="txtCodigo" name="codigo" label="Código"
                                tipo="number" onchange={handleChange}
                                readonly={true}
                                maxCaracteres={5} />
                        </Col>
                        <Col xs={12} md={12}>
                            <CampoEntrada value={objeto.nome}
                                id="txtNome" name="nome" label="Nome"
                                tipo="text" onchange={handleChange}
                                readonly={false}
                                maxCaracteres={40} />
                        </Col>
                        <Col xs={12} md={6}>
                            <CampoEntrada value={objeto.telefone}
                                id="txtTelefone" name="telefone" label="Telefone"
                                tipo="text" onchange={handleChange}
                                readonly={false}
                                maxCaracteres={15} />
                        </Col>
                        <Col xs={12} md={6}>
                            <CampoEntrada value={objeto.email}
                                id="txtEmail" name="email" label="Email"
                                tipo="text" onchange={handleChange}
                                readonly={false}
                                requerido={true}
                                maxCaracteres={60} />
                        </Col>
                        <Col>
                            <CampoEntrada value={objeto.senha}
                                id="txtSenha" name="senha" label="Senha"
                                tipo="password" onchange={handleChange}
                                msgvalido="Senha OK" msginvalido="Informe a senha"
                                requerido={true} readonly={false}
                                maxCaracteres={40} />
                        </Col>
                        <Col xs={12} md={6}>
                            <CampoSelect
                                value={objeto.is_motorista ? "true" : "false"}
                                id="txtIsMotorista"
                                name="is_motorista"
                                label="É Motorista"
                                onchange={e => setObjeto({ ...objeto, is_motorista: e.target.value === "true" })}
                                msgvalido="É Motorista OK"
                                msginvalido="Informe se é ou não motorista"
                                requerido={true}
                            >
                                <option key="nao" value="false">Não</option>
                                <option key="sim" value="true">Sim</option>
                            </CampoSelect>
                        </Col>
                        <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">
                            Salvar Alterações
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )

}


export default Perfil;