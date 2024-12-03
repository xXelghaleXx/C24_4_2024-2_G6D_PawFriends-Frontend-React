import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import Welcome from "./components/shared/Welcome";
import QuienesSomos from "./components/shared/QuienesSomos";
import Donaciones from "./components/donations/Donaciones";
import Albergues from "./components/shelters/Albergues";
import Encuentros from "./components/adoption/Encuentros";
import Mascotas from "./components/users/Mascotas";
import Perfil from "./components/shelters/Perfil"; // Página Perfil
import EncuentroConfirmacion from "./components/adoption/EncuentroConfirmacion"; // Confirmación de Encuentros
import ChatAlbergue from "./components/chat/ChatAlbergues"; // Chat de Albergues
import FormAdopcion from "./components/adoption/FormAdopcion"; // Formulario de Adopción
import InfoLegal from "./components/shared/InfoLegal"; // Nuevo componente InfoLegal

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          {/* Ruta principal */}
          <Route path="/" element={<Login />} />

          {/* Rutas de autenticación */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Ruta de bienvenida */}
          <Route path="/welcome" element={<Welcome />} />

          {/* Rutas adicionales */}
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/donaciones" element={<Donaciones />} />
          <Route path="/albergues" element={<Albergues />} />

          {/* Rutas para Mascotas y Encuentros */}
          <Route path="/mascotas" element={<Mascotas />} />
          <Route path="/encuentros/:id" element={<Encuentros />} />

          {/* Ruta para la nueva funcionalidad EncuentroConfirmacion */}
          <Route path="/confirmacion/:id" element={<EncuentroConfirmacion />} />

          {/* Ruta para la página Perfil */}
          <Route path="/perfil" element={<Perfil />} />

          {/* Ruta para Chat de Albergues */}
          <Route path="/chat-albergues" element={<ChatAlbergue />} />

          {/* Ruta para Formulario de Adopción */}
          <Route path="/form-adopcion" element={<FormAdopcion />} />

          {/* Ruta para InfoLegal con soporte para parámetros */}
          <Route path="/info-legal" element={<InfoLegal />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
