import React from 'react';

import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../components/layouts/AdminLayout';
import Admin from '../components/Admin/adminsite';
import PrfAlbergue from '../components/onlyadmin/prf_albergue';
import Albergue from '../components/onlyadmin/albrg_admin';
import EditarAlbergue from '../components/onlyadmin/crear_albrg_admin';
const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/perfil" element={<PrfAlbergue />} />
        <Route path="/albergue" element={<Albergue />} />
        <Route path='/editar/albergue' element={< EditarAlbergue/>}/>
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
