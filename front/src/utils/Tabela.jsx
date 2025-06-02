import { useContext } from 'react';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import ContextMap from './ContextMap'
import { getTipoUsuario } from '../seguranca/Autenticacao';


function Tabela({ nomeContexto }) {
    const Contexto = ContextMap[nomeContexto];

    const { headers, objectHeaders, listaObjetos, novoObjeto, editarObjeto, deletarObjeto } = useContext(Contexto);

    return (
        <div>
            <Button style={{ marginBottom: '1rem' }} variant="primary" onClick={() => novoObjeto()}>
                Novo Objeto <i className="bi bi-file-earmark-plus"></i>
            </Button>
            {listaObjetos.length <= 0 || listaObjetos.length === undefined ? (<h1>Nenhum resultado encontrado</h1>) : (
                <div style={{ width: window.innerWidth <= 768 && '100vw' }}>
                    <Table striped bordered responsive>
                        <thead>
                            <tr>
                                {headers.map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {listaObjetos.map((objeto) => (
                                <tr key={objeto.codigo}>
                                    <td>
                                        <Button variant="info"
                                            onClick={() => editarObjeto(objeto.codigo)}>
                                            <i className="bi bi-pencil-square"></i>
                                            Editar
                                        </Button>
                                        {getTipoUsuario() === 'A' &&
                                            <Button variant="danger"
                                                onClick={() => { deletarObjeto(objeto.codigo); }}>
                                                <i className="bi bi-trash"></i>
                                                Deletar
                                            </Button>
                                        }
                                    </td>
                                    {objectHeaders.map((objHeader, index) => (
                                        <td style={{ maxWidth: '500px', wordWrap: 'break-word' }} key={index}>{objeto[objHeader.toLowerCase()]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    )

}

export default Tabela;
