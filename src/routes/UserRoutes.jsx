import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import UserLayout from '../components/layouts/UserLayout';
import Login from '../components/users/Login';
import Register from '../components/users/Register';
import Welcome from '../components/shared/Welcome';
import Donaciones from '../components/donations/Donaciones';
import Albergues from '../components/shelters/Albergues';
import Encuentros from '../components/adoption/Encuentros';
import Mascotas from '../components/users/Mascotas';
import Perfil from '../components/shelters/Perfil';
import EncuentroConfirmacion from '../components/adoption/EncuentroConfirmacion';
import QuienesSomos from '../components/shared/QuienesSomos';
import TerminosLegales from '../components/shared/TerminosLegales';
import FormAdopcion from '../components/adoption/FormAdopcion';
import InfoLegal from '../components/shared/InfoLegal';
import SolicitudesAdopcion from '../components/adoption/SolicitudesAdopcion';

const UserRoutes = () => {
  return (
    <UserLayout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/donaciones" element={<Donaciones />} />
        <Route path="/albergues" element={<Albergues />} />
        <Route path="/mascotas/:id" element={<Mascotas />} />
        <Route path="/encuentros" element={<Encuentros />} />
        <Route path="/confirmacion/:id" element={<EncuentroConfirmacion />} />
        <Route path="/perfil" element={<Perfil />} />

        <Route path="/form-adopcion/:idPerro" element={<FormAdopcion />} />
        <Route path="/solicitudes-adopciones" element={<SolicitudesAdopcion />} />
        <Route path="/info-legal" element={<InfoLegal />} />
        <Route path="/terminos-legales" element={<TerminosLegales />} />
        <Route path="*" element={<Navigate to="/welcome" replace />} />
      </Routes>
    </UserLayout>
  );
};

export default UserRoutes;
