import axios from "axios";

import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/chat/UserMenuStyles.css";

const UserMenu = ({ isOpen, toggleMenu, userImage }) => {
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      toggleMenu();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const goToPerfil = () => {
    toggleMenu();
    navigate("/perfil");
  };

  const goToLogin = async () => {
    try {
      // Enviar solicitud de logout al backend
      const response = await axios.get("http://localhost:8094/api/users/logout", {
        withCredentials: true,
      });
  
      // Limpiar almacenamiento local y redirigir al login
      localStorage.clear();
      sessionStorage.clear();
      document.cookie = "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      toggleMenu();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar la sesión:", error);
      alert("Error al cerrar la sesión, inténtalo de nuevo.");
    }
  };
  

  return (
    <div
      ref={menuRef}
      className={`user-menu ${isOpen ? "menu-open" : "menu-closed"}`}
    >
      <div className="user-menu-header">

        <h2 className="user-menu-title">Menú de Usuario</h2>
      </div>
      <ul className="user-menu-list">
        <li className="user-menu-item">
          <button className="menu-button" onClick={goToPerfil}>
            Perfil
          </button>
        </li>
        <li className="user-menu-item">
          <button className="menu-button logout-button" onClick={goToLogin}>
            Cerrar Sesión
          </button>
        </li>
      </ul>
    </div>
  );
};

UserMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  userImage: PropTypes.string, // Añadir tipo para la imagen
};

export default UserMenu;
