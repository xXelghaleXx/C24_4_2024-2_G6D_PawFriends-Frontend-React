import React from 'react';
import NavbarAdmin from '../onlyadmin/nv_admin';
import FooterAdmin from '../onlyadmin/ft_admin';

const AdminLayout = ({ children }) => {
  return (
    <>
      <NavbarAdmin />
      <div className="admin-content">
        {children}
      </div>
      <FooterAdmin />
    </>
  );
};

export default AdminLayout;
