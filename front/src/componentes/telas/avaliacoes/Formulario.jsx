import { useContext } from "react";
import ModalDialogo from "../../../utils/ModalDialogo";
import AvaliacaoContext from "./AvaliacaoContext";
import Alerta from "../../../utils/Alerta";
import CampoEntrada from "../../../utils/CampoEntrada";
import Col from 'react-bootstrap/Col';
import CampoSelect from "../../../utils/CampoSelect";


function Formulario() {
    const { objeto, cadastrarObjeto, handleChange, alerta, editar, exibirForm, setExibirForm } = useContext(AvaliacaoContext);

    return (
        <ModalDialogo id="modalEdicao" titulo="Avaliação"
            idform="formulario" cadastrarObjeto={cadastrarObjeto}
            exibirForm={exibirForm} setExibirForm={setExibirForm}>
            <Alerta alerta={alerta} />
            <Col xs={12} md={12}>
                <CampoEntrada value={objeto.codigo}
                    id="txtCodigo" name="codigo" label="Código"
                    tipo="number" onchange={handleChange}
                    readonly={true}
                    maxCaracteres={5} />
            </Col>
            <Col xs={12} md={6}>
                <CampoEntrada value={objeto.codigo_usuario}
                    id="txtCodigoUsuario" name="codigo_usuario" label="Código Usuário"
                    tipo="number" onchange={handleChange}
                    readonly={editar ? true : false}
                    maxCaracteres={7} />
            </Col>
            <Col xs={12} md={6}>
                <CampoEntrada value={objeto.codigo_carona}
                    id="txtCodigoCarona" name="codigo_carona" label="Código Carona"
                    tipo="number" onchange={handleChange}
                    readonly={editar ? true : false}
                    maxCaracteres={7} />
            </Col>
            <Col xs={12} md={6}>
                <CampoEntrada value={objeto.nota}
                    id="txtNota" name="nota" label="Nota (1-5)"
                    tipo="number" onchange={handleChange}
                    readonly={false}
                    maxCaracteres={1} />
            </Col>
            <Col xs={12} md={12}>
                <CampoEntrada value={objeto.comentario}
                    id="txtComentario" name="comentario" label="Comentário"
                    tipo="text" onchange={handleChange}
                    readonly={false}
                    maxCaracteres={200} />
            </Col>
            <Col xs={12} md={12}>
                <CampoEntrada value={objeto.nome_usuario}
                    id="txtNomeUsuário" name="nome_usuario" label="Nome Usuário"
                    tipo="text" onchange={handleChange}
                    readonly={true}
                    maxCaracteres={120} />
            </Col>


        </ModalDialogo>
    )

}


export default Formulario;