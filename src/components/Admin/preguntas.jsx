// Preguntas.jsx
import { useState, useEffect } from "react";
import "../../styles/admin/preguntas.css";
import axios from "axios";

const Preguntas = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [newPregunta, setNewPregunta] = useState("");
  const [editPregunta, setEditPregunta] = useState(null);
  const userCorreo = "qwertmarcelo3@gmail.com"; // Asegúrate de obtener esto dinámicamente si es necesario

  // Cargar preguntas al montar el componente
  useEffect(() => {
    fetchPreguntas();
  }, []);

  const fetchPreguntas = async () => {
    try {
      const response = await axios.get(`/preguntas/?correo=${userCorreo}`);
      setPreguntas(response.data);
    } catch (error) {
      console.error("Error al cargar las preguntas:", error.response?.data || error.message);
      alert("No se pudo cargar la lista de preguntas.");
    }
  };

  // Función para añadir una nueva pregunta
  const handleAddPregunta = async () => {
    if (newPregunta.trim() === "") {
      alert("La pregunta no puede estar vacía.");
      return;
    }
    try {
      await axios.post(`/preguntas/crear/?correo=${userCorreo}`, {
        pregunta: newPregunta.trim(),
      });
      setNewPregunta("");
      fetchPreguntas(); // Actualiza la lista después de crear
      alert("Pregunta añadida exitosamente.");
    } catch (error) {
      console.error("Error al añadir la pregunta:", error.response?.data || error.message);
      alert("No se pudo añadir la pregunta.");
    }
  };
  
  

  // Función para iniciar la edición de una pregunta
  const handleEditPregunta = (pregunta) => {
    setEditPregunta({ ...pregunta });
  };

  // Función para actualizar la pregunta editada
  const handleUpdatePregunta = async () => {
    if (!editPregunta.pregunta.trim()) {
      alert("La pregunta no puede estar vacía.");
      return;
    }
  
    try {
      await axios.post(
        `/preguntas/actualizar/${editPregunta.id_pregunta}/?correo=${userCorreo}`,
        { pregunta: editPregunta.pregunta.trim() }
      );
      setPreguntas(
        preguntas.map((p) =>
          p.id_pregunta === editPregunta.id_pregunta
            ? { ...p, pregunta: editPregunta.pregunta.trim() }
            : p
        )
      );
      setEditPregunta(null);
      alert("Pregunta actualizada exitosamente.");
    } catch (error) {
      console.error("Error al actualizar la pregunta:", error.response?.data || error.message);
      alert("No se pudo actualizar la pregunta.");
    }
  };
  
  

  // Función para eliminar una pregunta
  const handleDeletePregunta = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta pregunta?")) return;
    try {
      await axios.delete(`/preguntas/eliminar/${id}/`, { params: { correo: userCorreo } });
      setPreguntas(preguntas.filter((p) => p.id_pregunta !== id));
      alert("Pregunta eliminada exitosamente.");
    } catch (error) {
      console.error("Error al eliminar la pregunta:", error.response?.data || error.message);
      alert("No se pudo eliminar la pregunta.");
    }
  };

  return (
    <div className="preguntas-container">
      <h1>Gestión de Preguntas</h1>

      {/* Formulario para añadir una nueva pregunta */}
      <div className="add-pregunta-form">
        <input
          type="text"
          placeholder="Escribe una nueva pregunta"
          value={newPregunta}
          onChange={(e) => setNewPregunta(e.target.value)}
          className="pregunta-input"
        />
        <button className="add-pregunta-button" onClick={handleAddPregunta}>
          Añadir Pregunta
        </button>
      </div>

      {/* Contenedor con scroll para la lista de preguntas */}
      <div className="preguntas-list list-container">
        {preguntas.map((pregunta) => (
          <div key={pregunta.id_pregunta} className="pregunta-card">
            {editPregunta && editPregunta.id_pregunta === pregunta.id_pregunta ? (
              <div className="edit-pregunta-form">
                <input
                  type="text"
                  value={editPregunta.pregunta}
                  onChange={(e) =>
                    setEditPregunta({ ...editPregunta, pregunta: e.target.value })
                  }
                  className="pregunta-input"
                />
                <button className="update-pregunta-button" onClick={handleUpdatePregunta}>
                  Guardar
                </button>
                <button className="cancel-button" onClick={() => setEditPregunta(null)}>
                  Cancelar
                </button>
              </div>
            ) : (
              <>
                <p className="pregunta-text">{pregunta.pregunta}</p>
                <div className="pregunta-actions">
                  <button className="edit-button" onClick={() => handleEditPregunta(pregunta)}>
                    Editar
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeletePregunta(pregunta.id_pregunta)}
                  >
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Preguntas;
