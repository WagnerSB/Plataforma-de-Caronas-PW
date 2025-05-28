import { useState, useEffect } from "react";
import Tabela from "../../../utils/Tabela";
import AvaliacaoContext from './AvaliacaoContext'

import { getObjetosAPI, getObjetoPorCodigoAPI, adicionarObjetoAPI, deletarObjetoAPI } from '../../../servicos/BasicoServicos'
import Formulario from "./Formulario";
import Carregando from "../../../utils/Carregando"

const Avaliacoes = () => {
    const nomeObjeto = 'avaliacao'

    const headers = ['Ações', 'Código', 'Código Usuário', 'Código Carona', 'Nota', 'Comentário', 'Nome do Usuário'];
    const objectHeaders = ['codigo', 'codigo_usuario', 'codigo_carona', 'nota', 'comentario', 'nome_usuario'];

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);
    const [caronas, setCaronas] = useState([{ codigo: 0 }]);
    const [usuarios, setUsuarios] = useState([{ codigo: 0, nome: '' }])
    const [carregando, setCarregando] = useState(false);

    const [objeto, setObjeto] = useState({
        'codigo': 0,
        'codigo_usuario': 0,
        'codigo_carona': 0,
        'nota': 1,
        'comentario': '',
        'nome_usuario': ''
    })

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: '', message: '' });
        setObjeto({
            'codigo': 0,
            'codigo_usuario': 0,
            'codigo_carona': 0,
            'nota': 1,
            'comentario': '',
            'nome_usuario': ''
        });
        setExibirForm(true);
    }

    const recuperarAvaliacoes = async () => {
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
            recuperarAvaliacoes();
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
        recuperarAvaliacoes();
    }


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    useEffect(() => {
        recuperarAvaliacoes();
        recuperarCaronas();
    }, []);

    useEffect(() => {
        const fetchUsuarios = async () => {
            if (objeto?.codigo_carona) {
                const resultado = await getObjetoPorCodigoAPI('usuariosAvaliacao', objeto.codigo_carona);
                setUsuarios(resultado);
            }
        };
        fetchUsuarios();
    }, [objeto]);



    return (
        <AvaliacaoContext.Provider value={{
            alerta, headers, objectHeaders,
            listaObjetos, objeto, cadastrarObjeto, editar, editarObjeto,
            handleChange, novoObjeto, deletarObjeto, exibirForm, setExibirForm,
            usuarios, caronas
        }}>
            <h1>Avaliações</h1>
            <Carregando carregando={carregando}>
                <Tabela nomeContexto="AvaliacaoContext" />
            </Carregando>
            <Formulario />
        </AvaliacaoContext.Provider>
    )
}

export default Avaliacoes;