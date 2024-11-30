import { useParams } from "react-router-dom";
import "../css/EncuentroConfirmacion.css";
import { useState } from "react";
import Carlos01 from "../assets/Carlos.jpg";

const mascotas = [
  {
    id: 1,
    nombre: "Carlos",
    edad: "2",
    raza: "Bulldog",
    tamaño: "Mediano",
    sexo: "Macho",
    vacunas: "Sí",
    esterilizado: "Sí",
    descripcion: "Bulldog amigable y cariñoso.",
    imagenes: [Carlos01],
  },
  {
    id: 2,
    nombre: "Luna",
    edad: "3",
    raza: "Gato siamés",
    tamaño: "Pequeño",
    sexo: "Hembra",
    vacunas: "No",
    esterilizado: "Sí",
    descripcion: "Gata juguetona y curiosa.",
    imagenes: [Carlos01],
  },
];

const EncuentroConfirmacion = () => {
  const { id } = useParams();
  const mascota = mascotas.find((m) => m.id === parseInt(id)) || mascotas[0];
  const [imagenActual, setImagenActual] = useState(0);

  // Función para avanzar en el carrusel
  const siguienteImagen = () => {
    setImagenActual((prev) => (prev + 1) % mascota.imagenes.length);
  };

  // Función para retroceder en el carrusel
  const anteriorImagen = () => {
    setImagenActual((prev) => (prev - 1 + mascota.imagenes.length) % mascota.imagenes.length);
  };

  return (
    <div className="confirmacion-container">
      <div className="perfil-card">
        {/* Carrusel de imágenes */}
        <div className="imagen-container">
          <button className="imagen-flecha" onClick={anteriorImagen}>
            {"<"}
          </button>
          <img
            src={mascota.imagenes[imagenActual]}
            alt={`Imagen de ${mascota.nombre}`}
            className="imagen-principal"
          />
          <button className="imagen-flecha" onClick={siguienteImagen}>
            {">"}
          </button>
        </div>

        {/* Detalles de la mascota */}
        <div className="datos-container">
          <h2>{mascota.nombre}</h2>
          <p>
            <strong>Edad:</strong> {mascota.edad} años
          </p>
          <p>
            <strong>Raza:</strong> {mascota.raza}
          </p>
          <p>
            <strong>Tamaño:</strong> {mascota.tamaño}
          </p>
          <p>
            <strong>Sexo:</strong> {mascota.sexo}
          </p>
          <p>
            <strong>Vacunas completas:</strong> {mascota.vacunas}
          </p>
          <p>
            <strong>Esterilizado:</strong> {mascota.esterilizado}
          </p>
          <p>
            <strong>Descripción:</strong> {mascota.descripcion}
          </p>
          <div className="acciones">
            <button className="boton-amarillo">Adoptar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncuentroConfirmacion;
