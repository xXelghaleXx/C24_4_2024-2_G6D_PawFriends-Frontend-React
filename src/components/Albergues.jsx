import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; // Estilos necesarios para el carrusel
import 'slick-carousel/slick/slick-theme.css'; // Tema del carrusel
import '../css/Albergues.css';
import albergue01 from '../assets/albergue01.jpg';
import albergue02 from '../assets/albergue02.jpg';

const Albergues = () => {
  const navigate = useNavigate();

  const albergues = [
    {
      id: 1,
      name: 'PawFriends',
      description: 'Conoce a nuestras mascotas rescatadas y dales un hogar.',
      images: [albergue01], // Cambiado a "images"
    },
    {
      id: 2,
      name: 'Patitas Amigas',
      description: 'Descubre cómo puedes cambiar la vida de estas mascotas.',
      images: [albergue02], // Cambiado a "images"
    },
  ];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleViewMascotas = (albergueName) => {
    navigate('/mascotas', { state: { albergueName } });
  };

  return (
    <div className="albergues-container">
      <h1>Albergues</h1>
      {albergues.map((albergue) => (
        <div key={albergue.id} className="albergue-card">
          <h2>{albergue.name}</h2>
          <div className="carousel-container">
            <Slider {...settings}>
              {albergue.images.map((image, index) => ( // Cambiado "image" a "images"
                <div key={index} className="carousel-slide">
                  <img src={image} alt={`${albergue.name} slide ${index + 1}`} />
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
  );
};

export default Albergues;

