import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Outlet } from 'react-router-dom';

function Menu() {
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <NavLink className="navbar-brand" aria-current="page" exact="true" to="/">Caronas</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Manutenções" id="basic-nav-dropdown">
                                <NavLink className="dropdown-item" exact="true" to="usuarios">Usuários</NavLink>
                                <NavLink className="dropdown-item" exact="true" to="caronas">Caronas</NavLink>
                                <NavLink className="dropdown-item" exact="true" to="avaliacoes">Avaliações</NavLink>
                                <NavLink className="dropdown-item" exact="true" to="reservas">Reservas</NavLink>
                            </NavDropdown>
                            <NavLink className="nav-link active" aria-current="page" exact="true" to="/sobre">Sobre...</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
                    <Outlet/>
            </div>
        </div>
    );
}

export default Menu;