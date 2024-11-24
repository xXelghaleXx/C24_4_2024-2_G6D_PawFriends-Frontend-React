import { Link } from "react-router-dom";
import Slider from "react-slick"; // Importar React Slick
import "../css/WelcomeStyle.css";
import Donation from "../assets/donacion.png";
import Adopcion from "../assets/Adopcion.png";
import Albergue from "../assets/Albergues.png";
import Quienes_Somos from "../assets/Quienes_somos.png";
import Mascota1 from "../assets/Carlos.jpg"; // Imágenes de las mascotas
import Mascota2 from "../assets/Luna.jpg";
import Mascota3 from "../assets/Carlos_02.jpg";

const Welcome = () => {
  const sliderSettings = {
    dots: true, // Mostrar indicadores
    infinite: true, // Ciclar imágenes infinitamente
    speed: 500, // Velocidad de transición
    slidesToShow: 1, // Cuántas imágenes mostrar
    slidesToScroll: 1, // Cuántas imágenes avanzar
    autoplay: true, // Avanzar automáticamente
    autoplaySpeed: 3000, // Velocidad del autoplay
  };

  return (
    <div className="welcome-container">
      <div className="welcome-header">
        <h2>Hola, Usuario</h2>
        <p>Bienvenido a PawFriends</p>
      </div>

      {/* Carrusel de imágenes */}
      <div className="carousel-container">
        <Slider {...sliderSettings}>
          {/* Tarjeta 1 */}
          <div className="carousel-item">
            <img
              src={Mascota1}
              alt="Mascota 1"
              className="carousel-image"
            />
            <Link to="/encuentros/1">
              <button className="carousel-button">Ver Perfil de Max</button>
            </Link>
          </div>
          {/* Tarjeta 2 */}
          <div className="carousel-item">
            <img
              src={Mascota2}
              alt="Mascota 2"
              className="carousel-image"
            />
            <Link to="/encuentros/2">
              <button className="carousel-button">Ver Perfil de Luna</button>
            </Link>
          </div>
          {/* Tarjeta 3 */}
          <div className="carousel-item">
            <img
              src={Mascota3}
              alt="Mascota 3"
              className="carousel-image"
            />
            <Link to="/encuentros/3">
              <button className="carousel-button">Ver Perfil de Charlie</button>
            </Link>
          </div>
        </Slider>
      </div>
      <br/>
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
