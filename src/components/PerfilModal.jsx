import React from "react";
import "../css/PerfilModal.css";

const PerfilModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>
          &times;
        </button>
        <div className="modal-header">
          <img
            src="/path-to-profile-icon.png"
            alt="User"
            className="modal-profile-image"
          />
          <h3>Adrian, 30 años</h3>
        </div>
        <div className="modal-body">
          <p>Texto: xxxxxxxxxx</p>
          <p>Texto: xxxxxxxxxx</p>
          <p>Texto: xxxxxxxxxx</p>
          <p>Texto: 23</p>
          <p>Texto: xxxxxxxx</p>
          <p>Albergue: XXXXXXXXXXXXX</p>
        </div>
        <div className="modal-footer">
          <button className="modal-button save-button">Guardar</button>
          <button className="modal-button edit-button">Editar Perfil</button>
        </div>
      </div>
    </div>
  );
};

export default PerfilModal;
