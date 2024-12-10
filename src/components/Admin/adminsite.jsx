import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ManagePets from "./managepets";
import Preguntas from "./preguntas";
import Solicitudes from "./solicitudes";
import "../../styles/admin/adminsite.css";

const AdminSite = ({ user }) => {
  const [activeComponent, setActiveComponent] = useState(null);

  useEffect(() => {
    if (!user || user.tipo_usuario !== "albergue") {
      ;
    }
  }, [user]);

  const handleComponentChange = (component) => {
    setActiveComponent(component === activeComponent ? null : component);
  };

  const renderComponent = () => {
    if (!activeComponent) return null;

    return (
      <div className="albergue-admin-content">
        {activeComponent === "managePets" && <ManagePets />}
        {activeComponent === "manageQuestions" && <Preguntas />}
        {activeComponent === "viewRequests" && <Solicitudes />}
      </div>
    );
  };

  return (
    <div>
      <br /><br /><br /><br /><br /><br /><br />
      <div className="albergue-admin-container">
        <h1 className="albergue-admin-header">Panel de Administración de Albergues</h1>
        <div className="albergue-admin-options">
          <button
            className="albergue-admin-button"
            onClick={() => handleComponentChange("managePets")}
          >
            Mis Mascotas
          </button>
          <button
            className="albergue-admin-button"
            onClick={() => handleComponentChange("manageQuestions")}
          >
            Preguntas de Adopción
          </button>
          <button
            className="albergue-admin-button"
            onClick={() => handleComponentChange("viewRequests")}
          >
            Solicitudes
          </button>
        </div>
        {renderComponent()}
      </div>
      <br /><br /><br />
    </div>
  );
};

AdminSite.propTypes = {
  user: PropTypes.shape({
    tipo_usuario: PropTypes.string.isRequired,
    nombre: PropTypes.string,
    correo: PropTypes.string,
  }),
};

export default AdminSite;
