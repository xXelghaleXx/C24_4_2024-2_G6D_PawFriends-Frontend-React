import { useState } from "react";
import "../../styles/shared/InfoLegal.css";

const InfoLegal = () => {
  const [activeSection, setActiveSection] = useState("contacto"); // Estado para alternar entre secciones

  const renderSection = () => {
    switch (activeSection) {
      case "contacto":
        return (
          <div className="info-section">
            <h2>Contacto</h2>
            <p>
              Si tienes preguntas o necesitas más información, puedes
              contactarnos:
            </p>
            <ul>
              <li>
                <strong>Correo:</strong> soporte@pawfriends.com
              </li>
              <li>
                <strong>Teléfono:</strong> +51 123 456 789
              </li>
              <li>
                <strong>Dirección:</strong> Av. Amistad 123, Lima, Perú
              </li>
            </ul>
          </div>
        );
      case "terminos":
        return (
          <div className="info-section">
            <h2>Términos de Uso</h2>
            <p>
              Al usar nuestra plataforma, aceptas los siguientes términos:
            </p>
            <ul>
              <li>
                PawFriends actúa como intermediario entre refugios y adoptantes.
              </li>
              <li>
                Los usuarios deben proporcionar información veraz al registrarse
                o adoptar.
              </li>
              <li>
                Está prohibido el uso indebido de la plataforma, incluyendo
                actividades fraudulentas o engañosas.
              </li>
            </ul>
          </div>
        );
      case "privacidad":
        return (
          <div className="info-section">
            <h2>Política de Privacidad</h2>
            <p>
              Valoramos tu privacidad. Aquí están los puntos clave de nuestra
              política:
            </p>
            <ul>
              <li>
                Los datos personales recolectados se usan exclusivamente para
                los servicios de la plataforma.
              </li>
              <li>
                No compartimos tus datos con terceros sin tu consentimiento.
              </li>
              <li>
                Tienes derecho a solicitar la eliminación de tus datos en
                cualquier momento.
              </li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
        <br /><br /><br /><br /><br /><br />
    <div className="info-legal-container">
      <h1>Información Legal</h1>
      <div className="info-legal-tabs">
        <button
          className={`info-tab ${activeSection === "contacto" ? "active-tab" : ""}`}
          onClick={() => setActiveSection("contacto")}
        >
          Contacto
        </button>
        <button
          className={`info-tab ${activeSection === "terminos" ? "active-tab" : ""}`}
          onClick={() => setActiveSection("terminos")}
        >
          Términos de Uso
        </button>
        <button
          className={`info-tab ${activeSection === "privacidad" ? "active-tab" : ""}`}
          onClick={() => setActiveSection("privacidad")}
        >
          Política de Privacidad
        </button>
      </div>
      <div className="info-legal-content">{renderSection()}</div>
    </div>
    </div>
  );
};

export default InfoLegal;
