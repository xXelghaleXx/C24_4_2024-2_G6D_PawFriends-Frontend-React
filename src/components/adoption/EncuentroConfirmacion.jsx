import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/adoption/EncuentroConfirmacion.css";

const EncuentroConfirmacion = () => {
  const { id } = useParams();
  const [mascota, setMascota] = useState(null);
  const [imagenActual, setImagenActual] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      console.error("El parámetro 'id' no está definido");
      return;
    }

    const fetchMascota = async () => {
      try {
        const response = await axios.get(`http://localhost:8094/api/mascotas/${id}`, { withCredentials: true });
        setMascota(response.data);
      } catch (error) {
        console.error("Error al obtener la mascota:", error);
      }
    };

    fetchMascota();
  }, [id]);

  if (!mascota) {
    return <p>Cargando información de la mascota...</p>;
  }

  const siguienteImagen = () => {
    setImagenActual((prev) => (prev + 1) % mascota.imagenes?.length);
  };

  const anteriorImagen = () => {
    setImagenActual((prev) => (prev - 1 + mascota.imagenes?.length) % mascota.imagenes?.length);
  };

  const hablarConAlbergue = () => {
    if (!mascota.albergue?.telefono) {
      alert("El albergue no tiene un número de contacto disponible.");
      return;
    }

    const telefono = mascota.albergue.telefono;
    const mensaje = encodeURIComponent(`Hola, estoy interesado en adoptar a ${mascota.nombre}.`);
    const whatsappUrl = `https://wa.me/${telefono}?text=${mensaje}`;
    
    window.open(whatsappUrl, "_blank");
  };

  const irAlFormularioAdopcion = () => {
    if (!mascota.idPerro) {
      alert("No se proporcionó un ID válido para la mascota.");
      return;
    }
  
    navigate(`/form-adopcion/${mascota.idPerro}`);
  };
  

  return (
    <div className="confirmacion-container">
      <div className="perfil-card">
        <div className="imagen-container">
          <button className="imagen-flecha" onClick={anteriorImagen}>{"<"}</button>
          <img
            src={mascota.imagenes?.[imagenActual] || "https://via.placeholder.com/150"}
            alt={`Imagen de ${mascota.nombre}`}
            className="imagen-principal"
          />
          <button className="imagen-flecha" onClick={siguienteImagen}>{">"}</button>
        </div>

        <div className="datos-container">
          <h2>{mascota.nombre}</h2>
          <p><strong>Edad:</strong> {mascota.edad}</p>
          <p><strong>Raza:</strong> {mascota.raza}</p>
          <p><strong>Tamaño:</strong> {mascota.tamaño}</p>
          <p><strong>Sexo:</strong> {mascota.sexo}</p>
          <p><strong>Vacunas completas:</strong> {mascota.vacunas}</p>
          <p><strong>Esterilizado:</strong> {mascota.esterilizado}</p>
          <p><strong>Descripción:</strong> {mascota.descripcion}</p>
          <p><strong>Albergue:</strong> {mascota.albergue?.nombre || "Sin albergue"}</p>
          <p><strong>Teléfono:</strong> {mascota.albergue?.telefono || "No disponible"}</p>

          <div className="acciones">
            <button className="boton-amarillo" onClick={irAlFormularioAdopcion}>Adoptar</button>
            <button className="boton-naranja" onClick={hablarConAlbergue}>Hablar con el albergue</button>
            <button className="boton-gris" onClick={() => navigate(-1)}>Regresar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncuentroConfirmacion;
