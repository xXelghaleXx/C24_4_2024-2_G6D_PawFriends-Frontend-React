import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Mascotas.css';
import Carlos01 from "../assets/Carlos.jpg";
import Luna01 from "../assets/Luna.jpg";

const Mascotas = () => {
  const navigate = useNavigate();

  const handleNavigation = (id) => {
    navigate(`/encuentros/${id}`); // Redirige a Encuentros con el id de la mascota
  };

  return (
    <div className="mascotas-container">
      <h1 className="mascotas-title">Mascotas</h1>
      <div className="mascotas-grid">
        {/* Tarjeta de Carlos */}
        <div className="mascota-card" onClick={() => handleNavigation(1)}>
          <img
            src={Carlos01} // Utiliza la variable importada
            alt="Carlos"
            className="mascota-image"
          />
          <div className="mascota-info">
            <h3 className="mascota-name">Carlos, 2 años</h3>
            <button className="mascota-button">Ver Perfil</button>
          </div>
        </div>

        {/* Tarjeta de Luna */}
        <div className="mascota-card" onClick={() => handleNavigation(2)}>
          <img
            src={Luna01} // Utiliza la variable importada
            alt="Luna"
            className="mascota-image"
          />
          <div className="mascota-info">
            <h3 className="mascota-name">Luna, 3 años</h3>
            <button className="mascota-button">Ver Perfil</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mascotas;
