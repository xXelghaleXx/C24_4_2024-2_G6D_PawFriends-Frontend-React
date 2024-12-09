import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Asegúrate de importar Axios
import Logo from '../../assets/PawFriends_Logo.webp'; // Importar logo
import Slidebar from './Slidebar'; // Importar el Slidebar
import UserMenu from '../chat/UserMenu'; // Importar el UserMenu
import "../../styles/shared/navbar.css";
import "../../styles/global/generalStyles.css";

const Navbar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // Controla el menú de usuario
  const [isScrolled, setIsScrolled] = useState(false); // Controla el estado del navbar al hacer scroll
  const [userImage, setUserImage] = useState(null); // Estado para la imagen del usuario

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen); // Alterna el estado del menú
  };

  useEffect(() => {
    // Obtener los datos del usuario desde el backend (incluyendo la imagen)
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8094/api/users/perfil', {
          withCredentials: true, // Asegura que se envíen las cookies de sesión
        });
        if (response.data.imagen) {
          setUserImage(response.data.imagen); // Guarda la URL de la imagen del usuario
        } else {
          setUserImage('/path/to/default-image.png'); // Imagen por defecto si no hay imagen del usuario
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        setUserImage('/path/to/default-image.png'); // Imagen por defecto en caso de error
      }
    };

    fetchUserData();

    // Escuchar el evento de scroll
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <Slidebar />
      <div className="navbar-center">
        <Link to="/welcome">
          <img src={Logo} alt="PawFriends Logo" />
        </Link>
      </div>
      <div className="navbar-right">
        <div className="profile-container" onClick={toggleUserMenu}>
          <div className="profile-image-wrapper">
            <img
              src={userImage || '/path/to/default-image.png'} // Mostrar imagen del usuario o imagen por defecto
              alt="Perfil"
              className="profile-image-circle"
            />
          </div>
        </div>
      </div>
      {isUserMenuOpen && (
        <UserMenu
          isOpen={isUserMenuOpen}
          toggleMenu={toggleUserMenu}
          userImage={userImage} // Pasar la imagen al UserMenu
        />
      )}
    </nav>
  );
};

export default Navbar;
