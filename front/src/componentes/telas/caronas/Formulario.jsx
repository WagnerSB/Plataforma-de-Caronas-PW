import { useContext } from "react";
import ModalDialogo from "../../../utils/ModalDialogo";
import CaronaContext from "./CaronaContext";
import Alerta from "../../../utils/Alerta";
import CampoEntrada from "../../../utils/CampoEntrada";
import Col from 'react-bootstrap/Col';
import CampoSelect from "../../../utils/CampoSelect";


function Formulario() {
    const { objeto, cadastrarObjeto, handleChange, alerta, editar, exibirForm, setExibirForm, motoristas } = useContext(CaronaContext);
    return (
        <ModalDialogo id="modalEdicao" titulo="Carona"
            idform="formulario" cadastrarObjeto={cadastrarObjeto}
            exibirForm={exibirForm} setExibirForm={setExibirForm}>
            <Alerta alerta={alerta} />
            <Col xs={12} md={6}>
                <CampoEntrada value={objeto.codigo}
                    id="txtCodigo" name="codigo" label="Código"
                    tipo="number" onchange={handleChange}
                    readonly={true}
                    maxCaracteres={5} />
            </Col>
            <Col xs={12} md={6}>
                <CampoSelect value={objeto.codigo_motorista}
                    id="txtCodigoMotorista" name="codigo_motorista" label="Motorista"
                    onchange={handleChange} readOnly={editar ? true : false}
                    msgvalido="Certo" msginvalido="Informe o motorista"
                    requerido={true}>
                    {motoristas.map(motorista => (
                        <option key={motorista.codigo} value={motorista.codigo}>{motorista.nomeMotorista}</option>
                    ))}
                </CampoSelect>
            </Col>
            <Col xs={12} md={12}>
                <CampoEntrada value={objeto.origem}
                    id="txtOrigem" name="origem" label="Origem"
                    tipo="text" onchange={handleChange}
                    readonly={false}
                    maxCaracteres={120} />
            </Col>
            <Col xs={12} md={12}>
                <CampoEntrada value={objeto.destino}
                    id="txtDestino" name="destino" label="Destino"
                    tipo="text" onchange={handleChange}
                    readonly={false}
                    maxCaracteres={120} />
            </Col>
            <Col xs={12} md={6}>
                <CampoEntrada value={objeto.horario}
                    id="txtHorario" name="horario" label="Horário de Saída"
                    tipo="datetime" onchange={handleChange}
                    readonly={false}
                    maxCaracteres={18} />
            </Col>
            <Col xs={12} md={6}>
                <CampoEntrada value={objeto.horario_chegada}
                    id="txtHorarioChegada" name="horario_chegada" label="Horário de Chegada"
                    tipo="datetime" onchange={handleChange}
                    readonly={false}
                    maxCaracteres={18} />
            </Col>
            <Col xs={12} md={4}>
                <CampoEntrada value={objeto.vagas}
                    id="txtVagas" name="vagas" label="Vagas"
                    tipo="number" onchange={handleChange}
                    readonly={false}
                    maxCaracteres={2} />
            </Col>
            <Col xs={12} md={4}>
                <CampoEntrada value={objeto.vagas_ocupadas}
                    id="txtVagasOcupadas" name="vagas_ocupadas" label="Vagas Ocupadas"
                    tipo="number" onchange={handleChange}
                    readonly={true}
                    maxCaracteres={2} />
            </Col>
            <Col xs={12} md={6}>
                <CampoSelect value={objeto.status_carona}
                    id="txtStatusCarona" name="status_carona" label="Status da Carona"
                    onchange={handleChange}
                    msgvalido="Certo" msginvalido="Informe o status da carona"
                    requerido={true}>
                    <option value={'Confirmada'}>Confirmada</option>
                    <option value={'Concluída'}>Concluída</option>
                    <option value={'Em andamento'}>Em andamento</option>
                    <option value={'Cancelada'}>Cancelada</option>
                </CampoSelect>
            </Col>
            {/* <Col xs={12} md={12}>
                <CampoEntrada value={objeto.nome_motorista}
                    id="txtNomeMotorista" name="nome_motorista" label="Motorista"
                    tipo="text" onchange={handleChange}
                    readonly={true}
                    maxCaracteres={120} />
            </Col> */}

        </ModalDialogo>
    )

}


export default Formulario;