import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../../styles/users/Mascotas.css";

const Mascotas = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mascotas, setMascotas] = useState([]);
  const [albergueNombre, setAlbergueNombre] = useState("");

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const { state } = location;

        if (!state || !state.albergueId || !state.albergueName) {
          alert("No se proporcionó información válida del albergue.");
          navigate("/albergues");
          return;
        }

        setAlbergueNombre(state.albergueName);

        const response = await axios.get(
          `http://localhost:8094/api/albergues/${state.albergueId}/mascotas`,
          { withCredentials: true }
        );
        setMascotas(response.data);
      } catch (error) {
        console.error("Error al obtener las mascotas:", error);
        alert("Hubo un problema al cargar las mascotas. Por favor, intenta nuevamente.");
        navigate("/albergues");
      }
    };

    fetchMascotas();
  }, [location, navigate]);

  const handleNavigation = (mascota) => {
    // Redirige directamente a Confirmación con el id de la mascota
    navigate(`/confirmacion/${mascota.idPerro}`, { state: { mascota } });
  };

  return (
    <div className="mascotas-container">
      <h1 className="mascotas-title">Mascotas Disponibles en {albergueNombre}</h1>
      {mascotas.length > 0 ? (
        <div className="mascotas-grid">
          {mascotas.map((mascota) => (
            <div
              key={mascota.idPerro}
              className="mascota-card"
              onClick={() => handleNavigation(mascota)}
            >
              <img
                src={mascota.imagen || "https://via.placeholder.com/150"}
                alt={mascota.nombre}
                className="mascota-image"
              />
              <div className="mascota-info">
                <h3 className="mascota-name">
                  {mascota.nombre}, {mascota.edad || "Edad no especificada"}
                </h3>
                <button className="mascota-button">Ver Perfil</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-mascotas">No hay mascotas disponibles en este albergue.</p>
      )}
    </div>
  );
};

export default Mascotas;

