import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../css/Encuentros.css";
import Carlos01 from "../assets/Carlos.jpg";
import Luna01 from "../assets/Luna.jpg";

const mascotas = [
  {
    id: 1,
    nombre: "Carlos",
    edad: "2 años",
    descripcion: "Bulldog amigable y cariñoso",
    albergue: "Albergue Happy Paws",
    texto: ["Vacunado", "Esterilizado", "Convive bien con niños"],
    imagen: Carlos01,
  },
  {
    id: 2,
    nombre: "Luna",
    edad: "3 años",
    descripcion: "Gata juguetona y curiosa",
    albergue: "Refugio Cat Lovers",
    texto: ["Vacunada", "No convive con perros", "Muy independiente"],
    imagen: Luna01,
  },
];

const Encuentros = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [perfilActual, setPerfilActual] = useState(
    mascotas.findIndex((m) => m.id === parseInt(id)) || 0
  );
  const [animando, setAnimando] = useState(false);

  const siguientePerfil = () => {
    setAnimando(true); // Inicia la animación

    setTimeout(() => {
      setPerfilActual((prev) => (prev + 1) % mascotas.length); // Cambia al siguiente perfil
      setAnimando(false); // Finaliza la animación
    }, 500); // Tiempo de la animación en ms
  };

  const redirigirConfirmacion = () => {
    navigate(`/confirmacion/${mascotas[perfilActual].id}`);
  };

  const mascota = mascotas[perfilActual];

  return (
    <div className="encuentros-container">
      <div className={`perfil-card ${animando ? "animating-out" : ""}`}>
        <div className="imagen-container">
          <img src={mascota.imagen} alt={`Imagen de ${mascota.nombre}`} />
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
            <button className="boton-verde" onClick={redirigirConfirmacion}>
              ✔
            </button>
            <button className="boton-rojo" onClick={siguientePerfil}>
              ✖
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Encuentros;
