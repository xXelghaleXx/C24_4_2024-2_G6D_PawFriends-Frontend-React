import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/Albergues.css";
import albergue01 from "../assets/albergue01.jpg";
import albergue02 from "../assets/albergue02.jpg";
import albergue03 from "../assets/albergue03.jpg";
import albergue04 from "../assets/albergue04.jpg";
import albergue05 from "../assets/albergue05.jpeg";
import albergue06 from "../assets/albergue06.jpg";

const Albergues = () => {
  const navigate = useNavigate();

  const albergues = [
    {
      id: 1,
      name: "PawFriends",
      description: "Conoce a nuestras mascotas rescatadas y dales un hogar.",
      images: [albergue01, albergue03, albergue05],
    },
    {
      id: 2,
      name: "Patitas Amigas",
      description: "Descubre cómo puedes cambiar la vida de estas mascotas.",
      images: [albergue02, albergue04, albergue06],
    },
  ];

  const settings = {
    dots: true, // Muestra los indicadores (dots)
    infinite: true, // Ciclo infinito
    speed: 500, // Velocidad de transición
    slidesToShow: 1, // Muestra solo una imagen a la vez
    slidesToScroll: 1, // Avanza de una en una
    autoplay: true, // Activa el cambio automático
    autoplaySpeed: 3000, // Cambia cada 3 segundos
    arrows: false, // Desactiva las flechas de navegación
  };

  const handleViewMascotas = (albergueName) => {
    navigate("/mascotas", { state: { albergueName } });
  };

  const handleNearbyAlbergues = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`Ubicación actual: Lat ${latitude}, Long ${longitude}`);
        alert("Mostrando albergues cercanos basados en tu ubicación.");
      },
      (error) => {
        console.error("Error obteniendo ubicación:", error);
        alert("No pudimos acceder a tu ubicación. Por favor activa el GPS.");
      }
    );
  };

  return (
    <div>
      <br /><br /><br /><br /><br /><br />
      <div className="albergues-container">
        <h1>Nuestros Albergues Disponibles</h1>
        <div className="filtros-container">
          <button onClick={handleNearbyAlbergues}>Albergues por zona</button>
        </div>
        <div className="albergues-grid">
          {albergues.map((albergue) => (
            <div key={albergue.id} className="albergue-card">
              <h2>{albergue.name}</h2>
              <div className="carousel-container">
                <Slider {...settings}>
                  {albergue.images.map((image, index) => (
                    <div key={index} className="carousel-slide">
                      <img
                        src={image}
                        alt={`${albergue.name} slide ${index + 1}`}
                        className="carousel-image"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
              <p>{albergue.description}</p>
              <button
                className="view-mascotas-btn"
                onClick={() => handleViewMascotas(albergue.name)}
              >
                Ver Mascotas
              </button>
            </div>
          ))}
        </div>
      </div>
      <br /><br /><br /><br />
    </div>
  );
};

export default Albergues;
