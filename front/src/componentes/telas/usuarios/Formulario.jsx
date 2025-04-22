import { useContext } from "react";
import ModalDialogo from "../../../utils/ModalDialogo";
import UsuarioContext from "./UsuarioContext";
import Alerta from "../../../utils/Alerta";
import CampoEntrada from "../../../utils/CampoEntrada";
import Col from 'react-bootstrap/Col';
import CampoSelect from "../../../utils/CampoSelect";
import CampoCheckbox from "../../../utils/CampoCheckbox";


function Formulario() {
    const { objeto, cadastrarObjeto, handleChange, alerta, editar, exibirForm, setExibirForm } = useContext(UsuarioContext);
    
    return (
        <ModalDialogo id="modalEdicao" titulo="Usuário"
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
                    tipo="number" onchange={handleChange}
                    readonly={false}
                    maxCaracteres={15} />
            </Col>
            <Col xs={12} md={6}>
                <CampoEntrada value={objeto.email}
                    id="txtEmail" name="email" label="Email"
                    tipo="text" onchange={handleChange}
                    readonly={false}
                    maxCaracteres={60} />
            </Col>
            <Col xs={12} md={6}>
                <CampoCheckbox value={objeto.is_motorista}
                    id="txtIsMotorista" name="is_motorista" label="É Motorista"
                    tipo="checkbox" onchange={handleChange}
                    readonly={false}/>
            </Col>



        </ModalDialogo>
    )

}


export default Formulario;