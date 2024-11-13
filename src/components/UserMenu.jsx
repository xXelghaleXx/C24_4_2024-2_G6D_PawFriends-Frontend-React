import PropTypes from 'prop-types'; // Importar PropTypes para validar props
import { Link } from 'react-router-dom'; // Importar Link para la navegación interna
import { useEffect, useRef } from 'react'; // Importar hooks necesarios
import '../css/UserMenuStyles.css'; // Importar los estilos del UserMenu

const UserMenu = ({ isOpen, toggleMenu }) => {
  const menuRef = useRef(null); // Referencia al menú

  // Función para manejar clics fuera del menú
  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      toggleMenu(); // Cierra el menú si se hace clic fuera de él
    }
  };

  // Agregar y eliminar eventos cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    // Limpieza del evento al desmontar el componente
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className={`user-menu ${isOpen ? 'open' : ''}`}>
      <h2>Menú de Usuario</h2>
      <ul>
        <li>
          <Link to="/perfil" onClick={toggleMenu}>
            Perfil
          </Link>
        </li>
        <li>
          <Link to="/ajustes" onClick={toggleMenu}>
            Ajustes
          </Link>
        </li>
        <li>
          <Link to="/login" onClick={toggleMenu}>
            Cerrar Sesión
          </Link>
        </li>
      </ul>
    </div>
  );
};

// Definir los tipos de las props
UserMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired, // isOpen debe ser booleano y requerido
  toggleMenu: PropTypes.func.isRequired, // toggleMenu debe ser una función y requerido
};

export default UserMenu;
