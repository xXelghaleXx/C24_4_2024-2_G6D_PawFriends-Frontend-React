import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Importar Link desde react-router-dom
import '../../styles/onlyadmin/sldbr_admin.css'; // Importar el archivo CSS con los estilos

const Slidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Controla si el Slidebar está abierto
  const slidebarRef = useRef(null); // Referencia al contenedor del Slidebar

  const toggleSlidebar = () => {
    setIsOpen(!isOpen); // Cambia el estado del Slidebar
  };

  const handleClickOutside = (event) => {
    if (slidebarRef.current && !slidebarRef.current.contains(event.target)) {
      setIsOpen(false); // Cierra el Slidebar si el clic no es dentro de él
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="sldbr-container" ref={slidebarRef}>
      <input
        className="sldbr-input-checkbox"
        type="checkbox"
        checked={isOpen}
        onChange={toggleSlidebar}
      />
      <div
        className={`sldbr-toggle ${isOpen ? 'sldbr-hide' : ''}`}
        onClick={toggleSlidebar}
      >
        <span className="sldbr-line sldbr-line-top"></span>
        <span className="sldbr-line sldbr-line-middle"></span>
        <span className="sldbr-line sldbr-line-bottom"></span>
      </div>
      <div className={`sldbr-menu ${isOpen ? 'sldbr-open' : ''}`}>
        <h1 className="sldbr-title">Menú de Administrador</h1>
        <ul className="sldbr-list">
          <li className="sldbr-item">
            {/* Redirigir al panel de administrador */}
            <Link className="sldbr-link" to="/admin" onClick={toggleSlidebar}>
              Panel de Administrador
            </Link>
          </li>
          <li className="sldbr-item">
            {/* Redirigir a albrg-admin */}
            <Link className="sldbr-link" to="editar/albergue" onClick={toggleSlidebar}>
              Albergues
            </Link>
          </li>
          <li className="sldbr-item">
            <Link className="sldbr-link" to="/quienes-somos" onClick={toggleSlidebar}>
              Quiénes Somos
            </Link>
          </li>
          <li className="sldbr-item">
            <Link className="sldbr-link" to="/terminos-legales" onClick={toggleSlidebar}>
              Términos Legales
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Slidebar;
