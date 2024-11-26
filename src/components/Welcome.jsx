import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/WelcomeStyle.css";
import Mascota1 from "../assets/Carlos.jpg";
import Mascota2 from "../assets/Luna.jpg";
import Mascota3 from "../assets/Carlos_02.jpg";
import Donation from "../assets/donacion.png";
import Adopcion from "../assets/Adopcion.png";
import Albergue from "../assets/Albergues.png";
import Quienes_Somos from "../assets/Quienes_somos.png";

const Welcome = () => {
  const mascotas = [
    { id: 1, src: Mascota1, name: "Max", link: "/encuentros/1" },
    { id: 2, src: Mascota2, name: "Luna", link: "/encuentros/2" },
    { id: 3, src: Mascota3, name: "Charlie", link: "/encuentros/3" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? mascotas.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === mascotas.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="welcome-container">
      <div className="welcome-header">
        <h2>Hola, Adrian</h2>
        <p>Bienvenido a PawFriends</p>
      </div>

      {/* Carrusel Personalizado */}
      <div className="custom-carousel">
        <button className="carousel-control prev" onClick={handlePrev}>
          &#10094;
        </button>
        <div className="carousel-slide">
          <img src={mascotas[currentIndex].src} alt={`Mascota ${mascotas[currentIndex].name}`} className="carousel-image" />
          <div className="carousel-caption">
            <h5>{mascotas[currentIndex].name}</h5>
            <Link to={mascotas[currentIndex].link}>
              <button className="btn btn-primary">Ver Perfil de {mascotas[currentIndex].name}</button>
            </Link>
          </div>
        </div>
        <button className="carousel-control next" onClick={handleNext}>
          &#10095;
        </button>
      </div>

      {/* Cuadrícula principal */}
      <div className="grid-container">
        <div className="grid-item">
          <img src={Donation} alt="Donaciones" className="grid-image" />
          <Link to="/donaciones">
            <button className="grid-button">Donaciones</button>
          </Link>
        </div>
        <div className="grid-item">
          <img src={Adopcion} alt="Encuentros" className="grid-image" />
          <Link to="/mascotas">
            <button className="grid-button">Mascotas</button>
          </Link>
        </div>
        <div className="grid-item">
          <img src={Albergue} alt="Albergues" className="grid-image" />
          <Link to="/albergues">
            <button className="grid-button">Albergues</button>
          </Link>
        </div>
        <div className="grid-item">
          <img src={Quienes_Somos} alt="Quiénes somos" className="grid-image" />
          <Link to="/quienes-somos">
            <button className="grid-button">Quiénes somos</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

