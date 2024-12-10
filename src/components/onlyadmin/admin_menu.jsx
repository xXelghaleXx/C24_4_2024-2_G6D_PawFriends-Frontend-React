import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/onlyadmin/admin_menu.css";

const AdminMenu = ({ isOpen, toggleMenu, user }) => {
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Cierra el menú al hacer clic fuera de él
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
    console.log("Redirigiendo a /onlyadmin/prf_albergue...");
    toggleMenu();
    navigate("/admin/perfil");
  };

  const goToLogin = () => {
    toggleMenu();
    navigate("/login");
  };

  return (
    <div
      ref={menuRef}
      className={`admin-menu-container ${isOpen ? "admin-menu-open" : "admin-menu-closed"}`}
    >
      <h2 className="admin-menu-title">Menú de Opciones</h2>
      <p className="admin-menu-greeting">Hola, {user?.nombre || "Usuario"}</p>
      <ul className="admin-menu-list">
        <li className="admin-menu-item">
          <button className="admin-menu-button" onClick={goToPerfil}>
            Mi Perfil
          </button>
        </li>
        <li className="admin-menu-item">
          <button className="admin-menu-button" onClick={goToLogin}>
            Cerrar Sesión
          </button>
        </li>
      </ul>
    </div>
  );
};

AdminMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  user: PropTypes.shape({
    tipo_usuario: PropTypes.string,
    nombre: PropTypes.string,
    correo: PropTypes.string,
  }).isRequired,
};

export default AdminMenu;
