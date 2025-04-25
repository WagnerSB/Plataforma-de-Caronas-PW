import { useContext } from "react";
import ModalDialogo from "../../../utils/ModalDialogo";
import ReservaContext from "./ReservaContext";
import Alerta from "../../../utils/Alerta";
import CampoEntrada from "../../../utils/CampoEntrada";
import CampoSelect from "../../../utils/CampoSelect";
import Col from 'react-bootstrap/Col';


function Formulario() {
    const { objeto, cadastrarObjeto, handleChange, alerta, exibirForm, setExibirForm, usuarios, caronas } = useContext(ReservaContext);
    return (
        <ModalDialogo id="modalEdicao" titulo="Reserva"
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
                <CampoSelect value={objeto.codigo_carona}
                    id="txtCodigoCarona" name="codigo_carona" label="Código da Carona"
                    onchange={handleChange}
                    msgvalido="Certo" msginvalido="Informe o código da carona"
                    requerido={true}>
                    {caronas.map(carona => (
                        <option key={carona.codigo} value={carona.codigo}>{carona.codigo}</option>
                    ))}
                </CampoSelect>
            </Col>
            <Col xs={12} md={6}>
                <CampoSelect value={objeto.codigo_usuario}
                    id="txtCodigoPassageiro" name="codigo_usuario" label="Passageiro"
                    onchange={handleChange}
                    msgvalido="Certo" msginvalido="Informe o usuário"
                    requerido={true}>
                    {usuarios.map(usuario => (
                        <option key={usuario.codigo} value={usuario.codigo}>{usuario.nome}</option>
                    ))}
                </CampoSelect>
            </Col>
        </ModalDialogo>
    )

}


export default Formulario;