import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/shelters/Albergues.css";

const Albergues = () => {
  const navigate = useNavigate();
  const [albergues, setAlbergues] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState("");
  const [selectedDistrito, setSelectedDistrito] = useState("");

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  useEffect(() => {
    const fetchAlbergues = async () => {
      try {
        const response = await fetch("http://localhost:8094/api/albergues");
        const data = await response.json();
        setAlbergues(data);

        const uniqueDepartamentos = [
          ...new Set(data.map((albergue) => albergue.departamento)),
        ];
        setDepartamentos(uniqueDepartamentos);
      } catch (error) {
        console.error("Error al obtener los albergues:", error);
      }
    };

    fetchAlbergues();
  }, []);

  useEffect(() => {
    if (selectedDepartamento) {
      const filteredDistritos = [
        ...new Set(
          albergues
            .filter((albergue) => albergue.departamento === selectedDepartamento)
            .map((albergue) => albergue.distrito)
        ),
      ];
      setDistritos(filteredDistritos);
    } else {
      setDistritos([]);
    }
  }, [selectedDepartamento, albergues]);

  const handleDepartamentoChange = (e) => {
    setSelectedDepartamento(e.target.value);
    setSelectedDistrito("");
  };

  const handleDistritoChange = (e) => {
    setSelectedDistrito(e.target.value);
  };

  const handleViewMascotas = (albergueId, albergueName) => {
    navigate("/mascotas/:id", { state: { albergueId, albergueName } });
  };

  const filteredAlbergues = albergues.filter((albergue) => {
    return (
      (!selectedDepartamento || albergue.departamento === selectedDepartamento) &&
      (!selectedDistrito || albergue.distrito === selectedDistrito)
    );
  });

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <div className="albergues-container">
        <h1>Nuestros Albergues Disponibles</h1>
        <div className="filtros-container">
          <select
            value={selectedDepartamento}
            onChange={handleDepartamentoChange}
            className="filtro-select"
          >
            <option value="">Seleccionar Departamento</option>
            {departamentos && departamentos.map((departamento, index) => (
              <option key={index} value={departamento}>
                {departamento}
              </option>
            ))}
          </select>
          <select
            value={selectedDistrito}
            onChange={handleDistritoChange}
            className="filtro-select"
            disabled={!selectedDepartamento}
          >
            <option value="">Seleccionar Distrito</option>
            {distritos && distritos.map((distrito, index) => (
              <option key={index} value={distrito}>
                {distrito}
              </option>
            ))}
          </select>
        </div>
        <div className="albergues-grid">
          {filteredAlbergues && filteredAlbergues.map((albergue) => (
            <div key={albergue.idAlbergue} className="albergue-card">
              <h2>{albergue.nombre}</h2>
              <div className="carousel-container">
                <Slider {...settings}>
                  {albergue.imagenes &&
                    albergue.imagenes.map((image, index) => (
                      <div key={index} className="carousel-slide">
                        <img
                          src={image}
                          alt={`${albergue.nombre} slide ${index + 1}`}
                          className="carousel-image"
                        />
                      </div>
                    ))}
                </Slider>
              </div>
              <p>{albergue.descripcion}</p>
              <button
                className="view-mascotas-btn"
                onClick={() =>
                  handleViewMascotas(albergue.idAlbergue, albergue.nombre)
                }
              >
                Ver Mascotas
              </button>
            </div>
          ))}
        </div>
        {filteredAlbergues.length === 0 && (
          <p>No se encontraron albergues para los filtros seleccionados.</p>
        )}
      </div>
    </div>
  );
};

export default Albergues;
