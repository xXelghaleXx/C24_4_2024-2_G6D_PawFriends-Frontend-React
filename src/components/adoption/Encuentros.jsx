import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/adoption/Encuentros.css";

const Encuentros = () => {
  const [mascotas, setMascotas] = useState([]); // Lista de mascotas desde la API
  const [perfilActual, setPerfilActual] = useState(0); // Controla la mascota actual
  const [imagenActual, setImagenActual] = useState(0); // Controla la imagen actual del carrusel
  const [animando, setAnimando] = useState(false);
  const navigate = useNavigate();

  // Llamar a la API para obtener la lista de mascotas
  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const response = await axios.get("http://localhost:8094/api/mascotas", { withCredentials: true });
        setMascotas(response.data);
      } catch (error) {
        console.error("Error al obtener las mascotas:", error);
      }
    };
    fetchMascotas();
  }, []);

  const siguienteImagen = () => {
    setImagenActual((prev) => (prev + 1) % (mascotas[perfilActual]?.imagenes?.length || 1));
  };

  const anteriorImagen = () => {
    setImagenActual((prev) =>
      (prev - 1 + (mascotas[perfilActual]?.imagenes?.length || 1)) % (mascotas[perfilActual]?.imagenes?.length || 1)
    );
  };

  const aceptarMascota = () => {
    const mascotaActual = mascotas[perfilActual];

    if (mascotaActual && mascotaActual.idPerro) {
      navigate(`/confirmacion/${mascotaActual.idPerro}`);
    } else {
      console.error("El ID de la mascota es undefined o inválido");
      alert("No se pudo procesar esta mascota. Inténtalo de nuevo.");
    }
  };

  const rechazarMascota = () => {
    setAnimando(true);
    setTimeout(() => {
      setPerfilActual((prev) => (prev + 1) % mascotas.length);
      setAnimando(false);
      setImagenActual(0);
    }, 500);
  };

  if (mascotas.length === 0) {
    return <p>Cargando mascotas...</p>;
  }

  const mascota = mascotas[perfilActual];

  return (
    <div className="encuentros-container">
      <div className={`perfil-card ${animando ? "animating-out" : ""}`}>
        <div className="imagen-container">
          <button className="carrusel-boton" onClick={anteriorImagen}>
            ◀
          </button>
          <img
            src={
              mascota.imagenes?.[imagenActual]?.url ||
              "https://via.placeholder.com/150"
            }
            alt={`Imagen de ${mascota.nombre}`}
          />
          <button className="carrusel-boton" onClick={siguienteImagen}>
            ▶
          </button>
        </div>
        <div className="datos-container">
          <h2>
            {mascota.nombre}, {mascota.edad}
          </h2>
          <p>
            <strong>Descripción:</strong> {mascota.descripcion}
          </p>
          <p>
            <strong>Albergue:</strong> {mascota.albergue?.nombre || "Sin albergue"}
          </p>
          <ul>
            {mascota.caracteristicas?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="acciones">
          <button className="boton-verde" onClick={aceptarMascota}>
            ✔
          </button>
          <button className="boton-rojo" onClick={rechazarMascota}>
            ✖
          </button>
        </div>
      </div>
    </div>
  );
};

export default Encuentros;
