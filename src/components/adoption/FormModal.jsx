import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../../styles/adoption/FormModal.css";

const FormModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleRedirect = () => {
    onClose();
    navigate("/welcome"); // Redirige a la ruta /welcome
  };

  return (
    <div className="form-modal-overlay-new">
      <div className="form-modal-content-new">
        <div className="form-check-icon-container-new">
          <svg xmlns="http://www.w3.org/2000/svg" className="form-check-icon-new" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="form-modal-title-new">¡Adopción Exitosa!</h2>
        <p className="form-modal-text-new">Gracias por adoptar y cambiar una vida. Nos pondremos en contacto contigo.</p>
        <button className="form-back-button-new" onClick={handleRedirect}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

FormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FormModal;
