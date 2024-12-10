import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/shared/WelcomeStyle.css";
import Donation from "../../assets/donacion.png";
import Adopcion from "../../assets/Adopcion.png";
import Albergue from "../../assets/Albergues.png";
import Quienes_Somos from "../../assets/Quienes_somos.png";
import Estado from "../../assets/Estado.jpeg";

const Welcome = () => {
  const [mascotas, setMascotas] = useState([]); // Lista de mascotas desde la API
  const [userName, setUserName] = useState("Usuario"); // Nombre de usuario por defecto
  const navigate = useNavigate(); // Redirige si no está autenticado
  const [currentIndex, setCurrentIndex] = useState(0); // Índice actual del carrusel
  const carouselInterval = useRef(null); // Referencia para el intervalo del carrusel

  // Obtener datos de la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtén el perfil del usuario
        const { data: userProfile } = await axios.get(
          "http://localhost:8094/api/users/perfil",
          { withCredentials: true }
        );
        setUserName(userProfile.nombre || "Usuario");

        // Obtén las mascotas para el carrusel
        const { data: petData } = await axios.get(
          "http://localhost:8094/api/users/welcome",
          { withCredentials: true }
        );

        if (Array.isArray(petData) && petData.length > 0) {
          // Asegúrate de que cada mascota tenga imágenes asociadas
          const mascotasConImagenes = petData.map((mascota) => ({
            ...mascota,
            imagen:
              mascota.imagenes?.[0]?.url || // Usa la primera imagen de Cloudinary
              "https://via.placeholder.com/300", // Imagen de marcador
          }));
          setMascotas(mascotasConImagenes);
        } else {
          setMascotas([]);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        navigate("/login"); // Redirige al login si ocurre un error
      }
    };

    fetchData();
  }, [navigate]);

  // Función para avanzar al siguiente índice
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === mascotas.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Función para retroceder al índice anterior
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? mascotas.length - 1 : prevIndex - 1
    );
  };

  // Configurar intervalo para desplazamiento automático
  useEffect(() => {
    if (mascotas.length > 0) {
      carouselInterval.current = setInterval(() => {
        handleNext();
      }, 5000); // Cambia cada 5 segundos

      return () => {
        clearInterval(carouselInterval.current);
      };
    }
  }, [mascotas]);

  // Calcular índices para las tarjetas anterior y siguiente
  const prevIndex = currentIndex === 0 ? mascotas.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === mascotas.length - 1 ? 0 : currentIndex + 1;

  // Manejar clic en la tarjeta actual para ver el perfil
  const handleViewProfile = (id) => {
    if (id) {
      navigate(`/confirmacion/${id}`);
    } else {
      console.error("ID de la mascota no disponible");
    }
  };

  return (
    <div className="welcome-wrapper">
      <div className="welcome-container">
        <div className="welcome-header">
          <h2>Hola, {userName}</h2>
          <p>Bienvenido a PawFriends</p>
        </div>

        {/* Nuevo Carrusel Personalizado */}
        {mascotas.length > 0 ? (
          <div className="carousel-container">
            {/* Botón Prev */}
            <button className="carousel-control prev" onClick={handlePrev}>
              &#10094;
            </button>

            {/* Carrusel de Tarjetas */}
            <div className="carousel-track">
              {/* Tarjeta Anterior */}
              <div className="carousel-card prev-card">
                <img
                  src={mascotas[prevIndex]?.imagen}
                  alt={`Mascota ${mascotas[prevIndex]?.nombre}`}
                />
                <div className="carousel-caption">
                  <h5>{mascotas[prevIndex]?.nombre}</h5>
                </div>
              </div>

              {/* Tarjeta Actual */}
              <div className="carousel-card active-card" onClick={() => handleViewProfile(mascotas[currentIndex]?.idPerro)}>
                <img
                  src={mascotas[currentIndex]?.imagen}
                  alt={`Mascota ${mascotas[currentIndex]?.nombre}`}
                />
                <div className="carousel-caption">
                  <h5>{mascotas[currentIndex]?.nombre}</h5>
                  <button className="btn btn-primary">Ver Perfil</button>
                </div>
              </div>

              {/* Tarjeta Siguiente */}
              <div className="carousel-card next-card">
                <img
                  src={mascotas[nextIndex]?.imagen}
                  alt={`Mascota ${mascotas[nextIndex]?.nombre}`}
                />
                <div className="carousel-caption">
                  <h5>{mascotas[nextIndex]?.nombre}</h5>
                </div>
              </div>
            </div>

            {/* Botón Next */}
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
            <img
              src={Quienes_Somos}
              alt="Quiénes somos"
              className="grid-image"
            />
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
    </div>
  );
};

export default Welcome;
