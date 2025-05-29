import { useState, useEffect } from "react";
import Tabela from "../../../utils/Tabela";
import ReservaContext from './ReservaContext'

import { getObjetosAPI, getObjetoPorCodigoAPI, adicionarObjetoAPI, deletarObjetoAPI } from '../../../servicos/BasicoServicos'
import Formulario from "./Formulario";
import Carregando from "../../../utils/Carregando";
import WithAuth from '../../../seguranca/WithAuth';


const Reservas = () => {
    const nomeObjeto = 'reserva'

    const headers = ['Ações', 'Código', 'Código Carona', 'Código Usuário', 'Nome Passageiro', 'Nome Motorista'];
    const objectHeaders = ['codigo', 'codigo_carona', 'codigo_usuario', 'nome_passageiro', 'nome_motorista'];

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);
    const [usuarios, setUsuarios] = useState([{ codigo: 0, nomeMotorista: '' }]);
    const [caronas, setCaronas] = useState([{ codigo: 0 }]);
    const [carregando, setCarregando] = useState(false);



    const [objeto, setObjeto] = useState({
        'codigo': 0,
        'codigo_carona': 0,
        'codigo_usuario': 0,
        'nome_passageiro': '',
        'nome_motorista': ''
    })

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: '', message: '' });
        setObjeto({
            'codigo': 0,
            'codigo_carona': 0,
            'codigo_usuario': 0,
            'nome_passageiro': '',
            'nome_motorista': ''
        });
        setExibirForm(true);
    }

    const recuperarReservas = async () => {
        setCarregando(true);
        setListaObjetos(await getObjetosAPI(nomeObjeto));
        setCarregando(false);
    };

    const recuperarCaronas = async () => {
        const resultado = await getObjetosAPI('carona');
        if (resultado.length > 0) {
            const codigos = resultado.map(carona => ({ codigo: carona.codigo }))
                .sort((a, b) => a.codigo - b.codigo);
            setCaronas(codigos);
        } else {
            setCaronas([]);
        }

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
            setAlerta({ status: apiResult.status, message: apiResult.message });
            recuperarReservas();
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
        recuperarReservas();
    }


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    useEffect(() => {
        recuperarReservas();
        recuperarCaronas();
    }, []);

    useEffect(() => {
        const fetchUsuarios = async () => {
            if (objeto?.codigo_carona) {
                const resultado = await getObjetoPorCodigoAPI('usuariosDisponiveis', objeto.codigo_carona);
                setUsuarios(resultado);
            }
        };
        fetchUsuarios();
    }, [objeto]);



    return (
        <ReservaContext.Provider value={{
            alerta, headers, objectHeaders,
            listaObjetos, objeto, cadastrarObjeto, editar, editarObjeto,
            handleChange, novoObjeto, deletarObjeto, exibirForm, setExibirForm, usuarios, caronas
        }}>
            <h1>Reservas</h1>
            <Carregando carregando={carregando}>
                <Tabela nomeContexto="ReservaContext" />
            </Carregando>
            <Formulario />
        </ReservaContext.Provider>
    )
}

export default WithAuth(Reservas);