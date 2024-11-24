import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Welcome from "./components/Welcome";
import QuienesSomos from "./components/QuienesSomos";
import Donaciones from "./components/Donaciones";
import TerminosLegales from "./components/TerminosLegales";
import Albergues from "./components/Albergues";
import Encuentros from "./components/Encuentros"; // Importamos el componente Encuentros
import Mascotas from "./components/Mascotas"; // Importamos el componente Mascotas

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
          <Route path="/terminos-legales" element={<TerminosLegales />} />
          <Route path="/albergues" element={<Albergues />} />

          {/* Rutas para Mascotas y Encuentros */}
          <Route path="/mascotas" element={<Mascotas />} />
          <Route path="/encuentros/:id" element={<Encuentros />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
