import { useState, useEffect } from "react";
import Tabela from "../../../utils/Tabela";
import CaronaContext from "./CaronaContext";
import { getObjetosAPI, getObjetoPorCodigoAPI, adicionarObjetoAPI, deletarObjetoAPI } from '../../../servicos/BasicoServicos'
import Formulario from "./Formulario";
import Alerta from "../../../utils/Alerta";

const Caronas = () => {
    const nomeObjeto = 'carona'

    const headers = ['Ações', 'Código', 'Código Motorista', 'Origem', 'Destino', 'Horário de Saída', 'Horário de Chegada', 'Vagas', 'Vagas Ocupadas', 'Status da Carona', 'Motorista'];
    const objectHeaders = ['codigo', 'codigo_motorista', 'origem', 'destino', 'horario', 'horario_chegada', 'vagas', 'vagas_ocupadas', 'status_carona', 'nome_motorista'];

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);
    const [motoristas, setMotoristas] = useState([{codigo: 0, nomeMotorista:''}]);

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    const [objeto, setObjeto] = useState({
        'codigo': 0,
        'codigo_motorista': 0,
        'origem': '',
        'destino': '',
        'horario': formatDate(new Date()),
        'horario_chegada': formatDate(new Date()),
        'vagas': 1,
        'vagas_ocupadas': 0,
        'status_carona': '',
        'nome_motorista': ''
    })

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            'codigo': 0,
            'codigo_motorista': 0,
            'origem': '',
            'destino': '',
            'horario': formatDate(new Date()),
            'horario_chegada': formatDate(new Date()),
            'vagas': 1,
            'vagas_ocupadas': 0,
            'status_carona': '',
            'nome_motorista': ''
        });
        setExibirForm(true);
    }

    const recuperarCaronas = async () => {
        setMotoristas(await getObjetosAPI('motoristas'));
        setListaObjetos(await getObjetosAPI(nomeObjeto));
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
            recuperarCaronas();
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
        recuperarCaronas();
    }


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    useEffect(() => {
        recuperarCaronas();
    }, []);



    return (
        <CaronaContext.Provider value={{
            alerta, headers, objectHeaders,
            listaObjetos, objeto, cadastrarObjeto, editar, editarObjeto,
            handleChange, novoObjeto, deletarObjeto, exibirForm, setExibirForm, motoristas
        }}>
            <h1>Caronas</h1>
            <Alerta alerta={alerta} />
            <Tabela nomeContexto="CaronaContext" />
            <Formulario />
        </CaronaContext.Provider>
    )
}

export default Caronas;