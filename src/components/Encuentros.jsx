import { useParams } from "react-router-dom";
import { useState } from "react";
import "../css/Encuentros.css";
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

const Encuentros = () => {
  const { id } = useParams(); // Obtiene el id de la URL
  const [perfilActual, setPerfilActual] = useState(
    mascotas.findIndex((m) => m.id === parseInt(id)) || 0
  );
  const [imagenActual, setImagenActual] = useState(0);

  const siguientePerfil = () => {
    setPerfilActual((prev) => (prev + 1) % mascotas.length);
    setImagenActual(0);
  };

  const anteriorPerfil = () => {
    setPerfilActual((prev) => (prev - 1 + mascotas.length) % mascotas.length);
    setImagenActual(0);
  };

  const siguienteImagen = () => {
    setImagenActual(
      (prev) =>
        mascotas[perfilActual].imagenes &&
        mascotas[perfilActual].imagenes.length > 0
          ? (prev + 1) % mascotas[perfilActual].imagenes.length
          : 0
    );
  };

  const anteriorImagen = () => {
    setImagenActual(
      (prev) =>
        mascotas[perfilActual].imagenes &&
        mascotas[perfilActual].imagenes.length > 0
          ? (prev - 1 + mascotas[perfilActual].imagenes.length) %
            mascotas[perfilActual].imagenes.length
          : 0
    );
  };

  const mascota = mascotas[perfilActual];

  return (
    <div className="encuentros-container">
      <button className="flecha" onClick={anteriorPerfil}>
        {"<"}
      </button>

      <div className="perfil-card">
        <div className="imagen-container">
          <button className="imagen-flecha" onClick={anteriorImagen}>
            {"<"}
          </button>
          <img
            src={
              mascota.imagenes && mascota.imagenes.length > 0
                ? mascota.imagenes[imagenActual]
                : "/assets/default.jpg"
            }
            alt={`Imagen de ${mascota.nombre}`}
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
            <strong>Descripción:</strong> {mascota.descripcion}
          </p>
          <p>
            <strong>Albergue:</strong> {mascota.albergue}
          </p>
          <ul>
            {mascota.texto.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <div className="acciones">
            <button className="boton-verde">✔</button>
            <button className="boton-rojo">✖</button>
          </div>
        </div>
      </div>

      <button className="flecha" onClick={siguientePerfil}>
        {">"}
      </button>
    </div>
  );
};

export default Encuentros;
