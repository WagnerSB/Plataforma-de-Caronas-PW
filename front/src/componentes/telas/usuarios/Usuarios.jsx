import { useState, useEffect } from "react";
import Tabela from "../../../utils/Tabela";
import UsuarioContext from './UsuarioContext'

import { getObjetosAPI, getObjetoPorCodigoAPI, adicionarObjetoAPI, deletarObjetoAPI } from '../../../servicos/BasicoServicos'
import Formulario from "./Formulario";
import Alerta from "../../../utils/Alerta";

const Usuarios = () => {
    const nomeObjeto = 'usuario'

    const headers = ['Ações', 'Código', 'Nome', 'Telefone', 'Email', 'É Motorista'];
    const objectHeaders = ['codigo', 'nome', 'telefone', 'email', 'is_motorista'];

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);

    const [objeto, setObjeto] = useState({
        'codigo': 0,
        'nome': '',
        'telefone': '',
        'email': '',
        'is_motorista': false
    })

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: '', message: '' });
        setObjeto({
            'codigo': 0,
            'nome': '',
            'telefone': '',
            'email': '',
            'is_motorista': false
        });
        setExibirForm(true);
    }

    const recuperarUsuarios = async () => {
        let apiResponse = await getObjetosAPI(nomeObjeto);
        apiResponse.map(obj => {
            obj.is_motorista = obj.is_motorista ? 'Sim' : 'Não';
        })
        setListaObjetos(apiResponse);
    };

    const editarObjeto = async (codigo) => {
        setObjeto(await getObjetoPorCodigoAPI(nomeObjeto, codigo))
        setEditar(true);
        setAlerta({ status: "", message: "" });
        setExibirForm(true);
    };

    const deletarObjeto = async (codigo) => {
        if (window.confirm('Deseja remover este objeto?')) {
            const apiResult = await deletarObjetoAPI(nomeObjeto, codigo);
            console.dir(apiResult)
            setAlerta({ status: apiResult.status, message: apiResult.message });
            recuperarUsuarios();
        }
    }

    const cadastrarObjeto = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            const apiResult = await adicionarObjetoAPI(nomeObjeto, objeto, metodo);
            setAlerta({ status: apiResult.status, message: apiResult.message });
            if (apiResult.status === 'error')
                return;
            setObjeto(apiResult.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.error(err.message);
        }
        recuperarUsuarios();
    }


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setObjeto({ ...objeto, [name]: value });

    };


    useEffect(() => {
        recuperarUsuarios();
    }, []);



    return (
        <UsuarioContext.Provider value={{
            alerta, headers, objectHeaders,
            listaObjetos, objeto, cadastrarObjeto, editar, editarObjeto,
            handleChange, novoObjeto, deletarObjeto, exibirForm, setExibirForm
        }}>
            <h1>Usuários</h1>
            <Alerta alerta={alerta} />
            <Tabela nomeContexto="UsuarioContext" />
            <Formulario />
        </UsuarioContext.Provider>
    )
}

export default Usuarios;