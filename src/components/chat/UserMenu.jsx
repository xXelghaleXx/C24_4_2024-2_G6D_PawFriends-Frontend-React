import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/chat/UserMenuStyles.css";

const UserMenu = ({ isOpen, toggleMenu }) => {
  const navigate = useNavigate(); // Hook para redirigir
  const menuRef = useRef(null); // Referencia al menú

  // Función para cerrar el menú al hacer clic fuera de él
  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      toggleMenu(); // Cierra el menú
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    // Limpieza al desmontar el componente
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  // Función para redirigir al perfil
  const goToPerfil = () => {
    toggleMenu(); // Cierra el menú
    navigate("/perfil");
  };

  // Función para cerrar sesión y redirigir al login
  const goToLogin = () => {
    toggleMenu(); // Cierra el menú
    navigate("/login");
  };

  // Función para ir al chat de albergues
  const goToChat = () => {
    toggleMenu(); // Cierra el menú
    navigate("/chat-albergues");
  };

  return (
    <div
      ref={menuRef}
      className={`user-menu ${isOpen ? "menu-open" : "menu-closed"}`}
    >
      <h2>Menú de Usuario</h2>
      <ul>
        <li>
          <button className="menu-button" onClick={goToPerfil}>
            Perfil
          </button>
        </li>
        <li>
          <button className="menu-button" onClick={goToChat}>
            Chatear con Albergues
          </button>
        </li>
        <li>
          <button className="menu-button" onClick={goToLogin}>
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
};

export default UserMenu;
