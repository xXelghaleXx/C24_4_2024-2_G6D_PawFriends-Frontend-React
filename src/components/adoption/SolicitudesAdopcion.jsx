import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/adoption/SolicitudesAdopcion.css";

const SolicitudesAdopcion = () => {
  const [adopciones, setAdopciones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdopciones = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8094/api/adopcion/solicitudes",
          { withCredentials: true }
        );
        setAdopciones(response.data);
      } catch (error) {
        setError("Hubo un error al cargar tus solicitudes de adopción. Inténtalo nuevamente.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdopciones();
  }, []);

  return (
    <div className="solicitudes-container">
      <div className="solicitudes-wrapper">
        <h1 className="solicitudes-title">Mis Solicitudes de Adopción</h1>

        {isLoading ? (
          <p className="loading-message">Cargando tus solicitudes de adopción...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : adopciones.length === 0 ? (
          <p className="no-solicitudes-message">No tienes solicitudes de adopción registradas.</p>
        ) : (
          <div className="table-container">
            <table className="solicitudes-table">
              <thead>
                <tr>
                  <th>Nombre del Perro</th>
                  <th>Estado</th>
                  <th>Fecha de Solicitud</th>
                  <th>Razón (si rechazada)</th>
                </tr>
              </thead>
              <tbody>
                {adopciones.map((adopcion, index) => (
                  <tr key={index}>
                    <td>{adopcion.mascota?.nombre || "Sin nombre"}</td>
                    <td
                      className={`status-${
                        adopcion.estadoSolicitud?.toLowerCase() || "pendiente"
                      }`}
                    >
                      {adopcion.estadoSolicitud}
                    </td>
                    <td>
                      {adopcion.fechaSolicitud
                        ? new Date(adopcion.fechaSolicitud).toLocaleDateString()
                        : "Sin fecha"}
                    </td>
                    <td>
                      {adopcion.estadoSolicitud === "RECHAZADA"
                        ? adopcion.razon || "Sin razón especificada"
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolicitudesAdopcion;
