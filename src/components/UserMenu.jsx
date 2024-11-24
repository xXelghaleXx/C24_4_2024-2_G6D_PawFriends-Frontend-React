import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import PerfilModal from "./PerfilModal"; // Importa el modal
import "../css/UserMenuStyles.css";

const UserMenu = ({ isOpen, toggleMenu }) => {
  const menuRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal de perfil

  // Función para manejar clics fuera del menú
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

  // Función para abrir el modal
  const openModal = () => {
    setIsModalOpen(true);
    toggleMenu(); // Cierra el menú al abrir el modal
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div ref={menuRef} className={`user-menu ${isOpen ? "open" : ""}`}>
        <h2>Menú de Usuario</h2>
        <ul>
          <li>
            <button className="menu-button" onClick={openModal}>
              Perfil
            </button>
          </li>
          <li>
            <button className="menu-button" onClick={toggleMenu}>
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>

      {/* Modal del perfil */}
      <PerfilModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

UserMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default UserMenu;
