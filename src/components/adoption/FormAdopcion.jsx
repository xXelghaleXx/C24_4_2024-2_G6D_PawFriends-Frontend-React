import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/adoption/FormAdopcion.css";
import FormModal from "./FormModal"; // Importa el modal de confirmación

const FormAdopcion = () => {
  const { idPerro } = useParams(); // Obtiene el ID del perro desde la URL
  const [questions, setQuestions] = useState([]); // Preguntas adicionales desde el backend
  const [answers, setAnswers] = useState({}); // Respuestas a las preguntas adicionales
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal
  const [errorMessage, setErrorMessage] = useState(""); // Mensaje de error
  const [successMessage, setSuccessMessage] = useState(""); // Mensaje de éxito

  // Cargar preguntas desde el backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8094/api/adopcion/${idPerro}/formulario`,
          { withCredentials: true } // Enviar cookies de sesión
        );
        setQuestions(response.data.preguntas); // Almacenar preguntas
      } catch (error) {
        console.error("Error al cargar las preguntas:", error);
        setErrorMessage("No se pudieron cargar las preguntas del formulario.");
      }
    };

    fetchQuestions();
  }, [idPerro]);

  // Manejar cambios en las respuestas
  const handleInputChange = (id, value) => {
    setAnswers((prev) => ({
      ...prev,
      [`respuesta_${id}`]: value, // Guardar respuesta con formato "respuesta_id"
    }));
  };

  // Enviar las respuestas del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reinicia mensajes de error
    setSuccessMessage(""); // Reinicia mensajes de éxito

    try {
      const response = await axios.post(
        `http://localhost:8094/api/adopcion/${idPerro}/guardar`,
        answers,
        { withCredentials: true } // Enviar credenciales
      );
      setSuccessMessage(response.data); // Mostrar éxito
      setIsModalOpen(true); // Abrir modal
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setErrorMessage("Hubo un problema al enviar tus respuestas."); // Mostrar error
    }
  };

  // Cerrar el modal y redirigir al inicio
  const closeModal = () => {
    setIsModalOpen(false);
    window.location.href = "/"; // Redirigir
  };

  return (
    <div>
      <FormModal isOpen={isModalOpen} onClose={closeModal} /> {/* Modal de éxito */}
      <div className="form-adopcion-container-new">
        <h2 className="titlename-new">Formulario de Adopción</h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="adopcion-form-new">
          {/* Preguntas adicionales dinámicas */}
          <div className="additional-questions-new">
            <h3>Preguntas Adicionales</h3>
            {questions.map((q) => (
              <div className="form-group-new" key={q.id_pregunta}>
                <label>{q.pregunta}</label>
                <textarea
                  value={answers[`respuesta_${q.id_pregunta}`] || ""}
                  onChange={(e) =>
                    handleInputChange(q.id_pregunta, e.target.value)
                  }
                  placeholder="Escribe tu respuesta"
                  required
                ></textarea>
              </div>
            ))}
          </div>

          <div className="form-actions-new">
            <button type="submit" className="submit-button-new">
              Enviar Respuestas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAdopcion;
