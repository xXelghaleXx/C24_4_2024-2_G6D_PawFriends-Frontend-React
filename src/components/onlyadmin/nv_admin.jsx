import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/PawFriends_Logo.webp';
import ProfileIcon from '../../assets/user.png';
import Slidebar from './sldbr_admin';
import AdminMenu from './admin_menu'; // Importar el componente AdminMenu
import '../../styles/onlyadmin/nv_admin.css'; // Importar estilos específicos para NVAdmin

const NVAdmin = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState({ nombre: 'Admin', correo: 'admin@example.com' }); // Datos de ejemplo de usuario

  // Alternar la visibilidad del menú de usuario
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // Detectar scroll para cambiar estilos del navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Limpiar el evento de scroll al desmontar el componente
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`nvadmin-navbar ${isScrolled ? 'nvadmin-scrolled' : ''}`}>
      {/* Slidebar para el menú lateral */}
      <Slidebar />

      {/* Logo centrado */}
      <div className="nvadmin-navbar-center">
        <Link to="/admin">
          <img src={Logo} alt="PawFriends Logo" className="nvadmin-navbar-logo" />
        </Link>
      </div>

      {/* Icono de perfil a la derecha */}
      <div className="nvadmin-navbar-right">
        <img
          src={ProfileIcon}
          alt="Perfil"
          className="nvadmin-profile-icon"
          onClick={toggleUserMenu}
        />
      </div>

      {/* Componente AdminMenu con todas las props necesarias */}
      {isUserMenuOpen && (
        <AdminMenu 
          isOpen={isUserMenuOpen} 
          toggleMenu={toggleUserMenu} 
          user={user} 
        />
      )}
    </nav>
  );
};

export default NVAdmin;
