import React from 'react';
import { useLocation } from 'react-router-dom';
import NavbarUser from '../shared/Navbar';
import FooterUser from '../shared/Footer';

const UserLayout = ({ children }) => {
  const location = useLocation();

  // Rutas donde se ocultan el Navbar y el Footer
  const hideHeaderAndFooter = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      {!hideHeaderAndFooter && <NavbarUser />}
      <div className="main-content">
        {children}
      </div>
      {!hideHeaderAndFooter && <FooterUser />}
    </>
  );
};

export default UserLayout;
