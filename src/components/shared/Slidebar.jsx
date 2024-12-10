import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Importar Link desde react-router-dom
import '../../styles/shared/Slidebar.css'; // Importar el archivo CSS con los estilos

const Slidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Controla si el slidebar está abierto
  const slidebarRef = useRef(null); // Referencia al contenedor del Slidebar

  // Alternar la visibilidad del Slidebar
  const toggleSlidebar = () => {
    setIsOpen(!isOpen);
  };

  // Cerrar el Slidebar si el usuario hace clic fuera de él
  const handleClickOutside = (event) => {
    if (slidebarRef.current && !slidebarRef.current.contains(event.target)) {
      setIsOpen(false);
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
    <div className="de-todo" ref={slidebarRef}>
      <input
        className="input_unico"
        type="checkbox"
        checked={isOpen}
        onChange={toggleSlidebar}
      />
      <div className={`toggle_unico ${isOpen ? 'hide' : ''}`} onClick={toggleSlidebar}>
        <span className="topo_unico comun_unico"></span>
        <span className="medio_unico comun_unico"></span>
        <span className="bajo_unico comun_unico"></span>
      </div>
      <div className={`slide_unico ${isOpen ? 'open' : ''}`}>
        <h1 className="titulo_unico">Menú Principal</h1>
        <ul className="ul_unico">
          <li className="li_unico">
            <Link className="a_unico" to="/welcome" onClick={toggleSlidebar}>
              Inicio
            </Link>
          </li>
          <li className="li_unico">
            <Link className="a_unico" to="/encuentros " onClick={toggleSlidebar}>
              Mascotas
            </Link>
          </li>
          <li className="li_unico">
            <Link className="a_unico" to="/donaciones" onClick={toggleSlidebar}>
              Donaciones
            </Link>
          </li>
          <li className="li_unico">
            <Link className="a_unico" to="/albergues" onClick={toggleSlidebar}>
              Albergues
            </Link>
          </li>
          <li className="li_unico">
            <Link className="a_unico" to="/quienes-somos" onClick={toggleSlidebar}>
              Quiénes Somos
            </Link>
          </li>
          <li className="li_unico">
            <Link className="a_unico" to="/terminos-legales" onClick={toggleSlidebar}>
              Términos Legales
            </Link>
          </li>
          <li className="li_unico">
            <Link className="a_unico" to="/solicitudes-adopciones" onClick={toggleSlidebar}>
              Solicitudes de Adopciones
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Slidebar;
