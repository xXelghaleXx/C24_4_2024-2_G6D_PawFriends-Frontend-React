import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
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
import Perfil from "./components/shelters/Perfil";
import EncuentroConfirmacion from "./components/adoption/EncuentroConfirmacion";
import ChatAlbergue from "./components/chat/ChatAlbergues";
import TerminosLegales from "./components/shared/TerminosLegales";
import FormAdopcion from "./components/adoption/FormAdopcion";
import InfoLegal from "./components/shared/InfoLegal";
import PrivateRoute from "./components/PrivateRoute";
import SolicitudesAdopcion from "./components/adoption/SolicitudesAdopcion";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51QTv3FRwW1GMSsQzfzmR7XmFNXOnaxdKDRccmLNdlDruKHcoviOZepAnRL1VrSMSV4jgKtoiRS1aKz3f0uNffp5d00qn09p42k");

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          {/* Ruta principal */}
          <Route path="/" element={<Navigate to="/welcome" replace />} />

          {/* Rutas de autenticación */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Ruta de bienvenida */}
          <Route path="/welcome" element={<Welcome />} />

          {/* Rutas adicionales */}
          <Route path="/quienes-somos" element={<QuienesSomos />} />

          {/* Envolver la ruta de Donaciones con el proveedor de Stripe */}
          <Route
            path="/donaciones"
            element={
              <Elements stripe={stripePromise}>
                <Donaciones />
              </Elements>
            }
          />

          <Route path="/albergues" element={<Albergues />} />

          {/* Rutas para Mascotas y Encuentros */}
          <Route path="/mascotas/:id" element={<Mascotas />} />
          <Route path="/encuentros" element={<Encuentros />} />

          {/* Ruta para la nueva funcionalidad EncuentroConfirmacion */}
          <Route path="/confirmacion/:id" element={<EncuentroConfirmacion />} />

          {/* Ruta para la página Perfil */}
          <Route path="/perfil" element={<Perfil />} />

          {/* Ruta para Chat de Albergues */}
          <Route path="/chat-albergues" element={<ChatAlbergue />} />

          {/* Ruta para Formulario de Adopción */}
          <Route path="/form-adopcion/:idPerro" element={<FormAdopcion />} />
          <Route path="/solicitudes-adopciones" element={<SolicitudesAdopcion />} />

          {/* Ruta para InfoLegal con soporte para parámetros */}
          <Route path="/info-legal" element={<InfoLegal />} />
          <Route path="/terminos-legales" element={<TerminosLegales />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
