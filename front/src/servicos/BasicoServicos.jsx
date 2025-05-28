import { getToken } from '../seguranca/Autenticacao';

export const getObjetosAPI = async (nomeObjeto) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${nomeObjeto}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': getToken()
            }
        }
    )
    const results = await response.json();
    return results;
}


export const getObjetoPorCodigoAPI = async (nomeObjeto, codigo) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${nomeObjeto}/${codigo}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': getToken()
            }
        }
    )
    const results = await response.json();
    return results;
}

export const deletarObjetoAPI = async (nomeObjeto, codigo) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${nomeObjeto}/${codigo}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': getToken()
            }
        }
    )
    const results = await response.json();
    return results;
}


export const adicionarObjetoAPI = async (nomeObjeto, objeto, metodo) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${nomeObjeto}`,
        {
            method: metodo,
            headers: {
                'Content-Type': 'application/json',
                'authorization': getToken()
            },
            body: JSON.stringify(objeto)
        }
    )
    const results = await response.json();
    return results;
}