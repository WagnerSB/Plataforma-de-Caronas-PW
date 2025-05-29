import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Menu from "./componentes/telas/Menu"
import Home from "./componentes/telas/Home"
import Sobre from "./componentes/telas/Sobre";
import Usuarios from "./componentes/telas/usuarios/Usuarios";
import Caronas from "./componentes/telas/caronas/Caronas";
import Avaliacoes from "./componentes/telas/avaliacoes/Avaliacoes";
import Reservas from "./componentes/telas/reservas/Reservas";
import MenuPrivado from "./componentes/telas/MenuPrivado";
import MenuPublico from "./componentes/telas/MenuPublico";
import Login from "./componentes/telas/login/Login"
import Registro from "./componentes/telas/login/Registro"

const router = createBrowserRouter([
  {
    path : "/",
    element : <MenuPublico/>,
    children : [
      {
        index : true,
        element : <Home/>
      },
      {
        path : "sobre",
        element : <Sobre/>
      }	,  
      {
        path : "login",
        element :  <Login/>
      },
      {
        path : "registro",
        element :  <Registro/>
      }                 
    ]
  },
  {
    path: "/privado",
    element: <MenuPrivado/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: "sobre",
        element: <Sobre/>
      },
      {
        path: "usuarios",
        element: <Usuarios/>
      },
      {
        path: "caronas",
        element: <Caronas/>
      },
      {
        path: "avaliacoes",
        element: <Avaliacoes/>
      },
      {
        path: "reservas",
        element: <Reservas/>
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
