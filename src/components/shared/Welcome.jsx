import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Usar navigate para redirigir si no está autenticado
import axios from "axios"; // Para consumir la API
import "../../styles/shared/WelcomeStyle.css";
import Donation from "../../assets/donacion.png";
import Adopcion from "../../assets/Adopcion.png";
import Albergue from "../../assets/Albergues.png";
import Quienes_Somos from "../../assets/Quienes_somos.png";
import Estado from "../../assets/Estado.jpeg";

const Welcome = () => {
  const [mascotas, setMascotas] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userName, setUserName] = useState("Usuario"); // Usuario por defecto
  const navigate = useNavigate(); // Usar navigate para redirigir si no está autenticado

  // Obtener datos de la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: userProfile } = await axios.get("http://localhost:8094/api/users/perfil", { withCredentials: true });
        setUserName(userProfile.nombre || "Usuario");
  
        const { data: petData } = await axios.get("http://localhost:8094/api/users/welcome", { withCredentials: true });
        if (petData && petData.length > 0) {
          setMascotas(petData);
        } else {
          setMascotas([]);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        navigate("/login"); // Assume the user needs to log in if the API call fails
      }
    };
  
    fetchData();
  }, [navigate]);  

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? mascotas.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === mascotas.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div>
      <br /><br /><br /><br />
      <div className="welcome-container">
        <div className="welcome-header">
          <h2>Hola, {userName}</h2>
          <p>Bienvenido a PawFriends</p>
        </div>

        {/* Carrusel Personalizado */}
        {mascotas.length > 0 ? (
          <div className="custom-carousel">
            <button className="carousel-control prev" onClick={handlePrev}>
              &#10094;
            </button>
            <div className="carousel-slide">
              <img
                src={mascotas[currentIndex]?.imagen || "https://via.placeholder.com/150"}
                alt={`Mascota ${mascotas[currentIndex]?.nombre}`}
                className="carousel-image"
              />
              <div className="carousel-caption">
                <h5>{mascotas[currentIndex]?.nombre}</h5>
                <Link to={`/encuentros/${mascotas[currentIndex]?.id}`}>
                  <button className="btn btn-primary">Ver Perfil de {mascotas[currentIndex]?.nombre}</button>
                </Link>
              </div>
            </div>
            <button className="carousel-control next" onClick={handleNext}>
              &#10095;
            </button>
          </div>
        ) : (
          <p>No hay mascotas disponibles en este momento.</p>
        )}

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
            <Link to="/encuentros">
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
          <div className="grid-item">
            <img src={Estado} alt="Estado" className="grid-image" />
            <Link to="/solicitudes-adopciones">
              <button className="grid-button">Solicitudes</button>
            </Link>
          </div>
        </div>
      </div>
      <br /><br />
    </div>
  );
};

export default Welcome;
