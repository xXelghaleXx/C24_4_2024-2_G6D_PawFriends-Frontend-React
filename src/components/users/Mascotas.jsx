import { useNavigate } from 'react-router-dom';
import '../../styles/users/Mascotas.css';
import Carlos01 from "../../assets/Carlos.jpg";
import Luna01 from "../../assets/Luna.jpg";

const Mascotas = () => {
  const navigate = useNavigate();

  // Array de datos de mascotas
  const mascotas = [
    {
      id: 1,
      name: "Carlos",
      age: "2 años",
      image: Carlos01,
    },
    {
      id: 2,
      name: "Luna",
      age: "3 años",
      image: Luna01,
    },
  ];

  const handleNavigation = (id) => {
    navigate(`/encuentros/${id}`); // Redirige a Encuentros con el id de la mascota
  };

  return (
    <div className="mascotas-container">
      <h1 className="mascotas-title">Mascotas</h1>
      <div className="mascotas-grid">
        {mascotas.map((mascota) => (
          <div
            key={mascota.id}
            className="mascota-card"
            onClick={() => handleNavigation(mascota.id)}
          >
            <img
              src={mascota.image} // Llama a la imagen del array
              alt={mascota.name}
              className="mascota-image"
            />
            <div className="mascota-info">
              <h3 className="mascota-name">
                {mascota.name}, {mascota.age}
              </h3>
              <button className="mascota-button">Ver Perfil</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mascotas;
