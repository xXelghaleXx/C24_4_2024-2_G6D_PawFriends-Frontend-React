import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Welcome from './components/Welcome';
import Perfil from './components/Perfil';
import QuienesSomos from './components/QuienesSomos'; // Importamos el componente QuienesSomos
import Donaciones from './components/Donaciones'; // Importamos el componente Donaciones
import TerminosLegales from './components/TerminosLegales';
import Albergues from './components/Albergues'; // Importamos el componente Albergues
import Encuentros from './components/Encuentros'; // Importamos el componente Encuentros

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} /> {/* Ruta añadida para QuienesSomos */}
          <Route path="/donaciones" element={<Donaciones />} /> {/* Ruta añadida para Donaciones */}
          <Route path="/terminos-legales" element={<TerminosLegales />} />
          <Route path="/albergues" element={<Albergues />} /> {/* Ruta añadida para Albergues */}
          <Route path="/encuentros" element={<Encuentros />} /> {/* Nueva ruta añadida para Encuentros */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
