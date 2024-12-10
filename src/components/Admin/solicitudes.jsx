import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/admin/solicitudes.css";

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const userCorreo = "qwertmarcelo3@gmail.com";

  // Fetch solicitudes
  const fetchSolicitudes = async () => {
    try {
      const response = await axios.get(`/adopciones/?correo=${userCorreo}`);
      setSolicitudes(response.data);
    } catch (error) {
      console.error("Error al cargar las solicitudes:", error.response?.data || error.message);
      alert("No se pudo cargar la lista de solicitudes.");
    }
  };

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  // Aceptar solicitud
  const handleAceptar = async (idAdopcion) => {
    try {
      await axios.post(`/adopciones/aceptar/${idAdopcion}/`);
      alert("Solicitud aceptada exitosamente.");
      fetchSolicitudes();
      setSelectedSolicitud(null);
    } catch (error) {
      console.error("Error al aceptar la solicitud:", error.response?.data || error.message);
      alert("No se pudo aceptar la solicitud.");
    }
  };

  // Rechazar solicitud
  const handleRechazar = async (idAdopcion) => {
    try {
      await axios.post(`/adopciones/rechazar/${idAdopcion}/`);
      alert("Solicitud rechazada exitosamente.");
      fetchSolicitudes();
      setSelectedSolicitud(null);
    } catch (error) {
      console.error("Error al rechazar la solicitud:", error.response?.data || error.message);
      alert("No se pudo rechazar la solicitud.");
    }
  };

  return (
    <div className="solicitudes-container">
      <h1>Solicitudes de Adopción</h1>
      {solicitudes.length === 0 ? (
        <p>No hay solicitudes pendientes.</p>
      ) : (
        <table className="solicitudes-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Adoptante</th>
              <th>Mascota</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((solicitud) => (
              <tr key={solicitud.id_adopcion}>
                <td>{solicitud.id_adopcion}</td>
                <td>{solicitud.adoptante}</td>
                <td>{solicitud.mascota}</td>
                <td>{new Date(solicitud.fecha).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`estado ${
                      solicitud.estado === "Pendiente"
                        ? "pendiente"
                        : solicitud.estado === "Aceptada"
                        ? "aceptada"
                        : "rechazada"
                    }`}
                  >
                    {solicitud.estado}
                  </span>
                </td>
                <td>
                  <button
                    className="detalles-button"
                    onClick={() => setSelectedSolicitud(solicitud)}
                  >
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedSolicitud && (
        <div className="modal">
          <div className="modal-content">
            <h2>Detalle de Solicitud</h2>
            <p>
              <strong>Adoptante:</strong> {selectedSolicitud.adoptante}
            </p>
            <p>
              <strong>Mascota:</strong> {selectedSolicitud.mascota}
            </p>
            <h3>Respuestas al Formulario:</h3>
            <ul>
              {selectedSolicitud.respuestas.map((respuesta, index) => (
                <li key={index}>
                  <strong>{respuesta.id_pregunta__pregunta}:</strong> {respuesta.respuesta}
                </li>
              ))}
            </ul>
            <div className="modal-actions">
              <button
                className="aceptar-button"
                onClick={() => handleAceptar(selectedSolicitud.id_adopcion)}
              >
                Aceptar
              </button>
              <button
                className="rechazar-button"
                onClick={() => handleRechazar(selectedSolicitud.id_adopcion)}
              >
                Rechazar
              </button>
              <button
                className="cerrar-button"
                onClick={() => setSelectedSolicitud(null)}
              >
                Volver a la Lista
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Solicitudes;
