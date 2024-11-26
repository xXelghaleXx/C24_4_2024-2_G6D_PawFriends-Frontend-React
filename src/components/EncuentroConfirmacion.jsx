import { useParams } from "react-router-dom";
import "../css/EncuentroConfirmacion.css";
import { useState } from "react";
import Carlos01 from "../assets/Carlos.jpg";
import Carlos02 from "../assets/Carlos_02.jpg";
import Carlos03 from "../assets/Carlos_03.jpg";
import Luna01 from "../assets/Luna.jpg";
import Luna02 from "../assets/Luna_02.jpg";
import Luna03 from "../assets/Luna_03.jpg";

const mascotas = [
  {
    id: 1,
    nombre: "Carlos",
    edad: "2 años",
    descripcion: "Bulldog amigable y cariñoso",
    albergue: "Albergue Happy Paws",
    texto: ["Vacunado", "Esterilizado", "Convive bien con niños"],
    imagenes: [Carlos01, Carlos02, Carlos03],
  },
  {
    id: 2,
    nombre: "Luna",
    edad: "3 años",
    descripcion: "Gata juguetona y curiosa",
    albergue: "Refugio Cat Lovers",
    texto: ["Vacunada", "No convive con perros", "Muy independiente"],
    imagenes: [Luna01, Luna02, Luna03],
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

  // Función para manejar la redirección al formulario
  const redirigirFormulario = () => {
    window.open(
      "https://docs.google.com/forms/d/1ErTV4zcvOwffaKaExHVnVK9nlkjmWQzDcl3qLWavTOE/edit",
      "_blank"
    );
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

        <div className="datos-container">
          <h2>
            {mascota.nombre}, {mascota.edad}
          </h2>
          <p>
            <strong>Descripción de la Mascota:</strong>
          </p>
          <ul>
            {mascota.texto.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p>
            <strong>Albergue:</strong> {mascota.albergue}
          </p>

          {/* Casilla de verificación */}
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="terminos"
              onChange={redirigirFormulario} // Redirige al formulario cuando se selecciona
            />
            <label htmlFor="terminos">
              Acepto los términos de adopción y el proceso legal
            </label>
          </div>

          {/* Botones */}
          <div className="acciones">
            <button className="boton-amarillo">Adoptar</button>
            <button className="boton-naranja">Hablar con el albergue</button>
            <button className="boton-gris">Regresar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncuentroConfirmacion;
