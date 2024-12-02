import { useState } from "react";
import "../css/FormAdopcion.css";
import FormModal from "./FormModal";

const FormAdopcion = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    mensaje: "",
  });

  const [additionalQuestions, setAdditionalQuestions] = useState([
    { id: 1, question: "¿Tienes otras mascotas en casa?", answer: "" },
    { id: 2, question: "¿Dónde pasará el animal la mayor parte del tiempo?", answer: "" },
    { id: 3, question: "¿Por qué quieres adoptar a esta mascota?", answer: "" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

  // Manejar cambios en los campos del formulario principal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar cambios en las preguntas adicionales
  const handleAdditionalAnswerChange = (id, value) => {
    setAdditionalQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === id ? { ...q, answer: value } : q
      )
    );
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulación de envío de datos
    const submissionData = {
      ...formData,
      additionalQuestions,
    };

    console.log("Datos enviados:", submissionData);
    setIsModalOpen(true); // Abrir el modal
  };

  // Cerrar modal
  const closeModal = () => {
    setIsModalOpen(false);
    window.location.href = "/"; // Redirigir al inicio
  };

  return (
    <div>
        <br /><br /><br /><br /><br />
    <div>
      {/* Modal de éxito */}
      <FormModal isOpen={isModalOpen} onClose={closeModal} />

      <div className="form-adopcion-container-new">
        <h2 className="titlename-new">Formulario de Adopción</h2>
        <form onSubmit={handleSubmit} className="adopcion-form-new">
          <div className="form-group-new">
            <label htmlFor="nombre">Nombre Completo:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Ingresa tu nombre completo"
              required
            />
          </div>

          <div className="form-group-new">
            <label htmlFor="correo">Correo Electrónico:</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleInputChange}
              placeholder="Ingresa tu correo electrónico"
              required
            />
          </div>

          <div className="form-group-new">
            <label htmlFor="telefono">Teléfono:</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              placeholder="Ingresa tu número de teléfono"
              required
            />
          </div>

          <div className="form-group-new">
            <label htmlFor="direccion">Dirección:</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
              placeholder="Ingresa tu dirección"
              required
            />
          </div>

          <div className="form-group-new">
            <label htmlFor="mensaje">Mensaje Adicional:</label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleInputChange}
              placeholder="Escribe un mensaje adicional (opcional)"
            ></textarea>
          </div>

          <div className="additional-questions-new">
            <h3>Preguntas Adicionales</h3>
            {additionalQuestions.map((q) => (
              <div className="form-group-new" key={q.id}>
                <label>{q.question}</label>
                <textarea
                  value={q.answer}
                  onChange={(e) => handleAdditionalAnswerChange(q.id, e.target.value)}
                  placeholder="Escribe tu respuesta"
                  required
                ></textarea>
              </div>
            ))}
          </div>

          <div className="form-actions-new">
            <button type="submit" className="submit-button-new">
              Enviar Formulario
            </button>
          </div>
        </form>
      </div>
    </div>
    <br /><br /><br /><br />
    </div>
  );
};

export default FormAdopcion;
