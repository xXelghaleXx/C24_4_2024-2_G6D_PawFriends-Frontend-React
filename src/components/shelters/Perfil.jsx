import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/shelters/PerfilStyles.css";
import DefaultProfile from "../../assets/user.png"; // Imagen predeterminada

const Perfil = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    distrito: "",
    departamento: "",
    tipoUsuario: "",
    imagen: DefaultProfile,
  });
  const [profileImage, setProfileImage] = useState(DefaultProfile);
  const [selectedImageFile, setSelectedImageFile] = useState(null); // Archivo seleccionado
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8094/api/users/perfil", {
          withCredentials: true,
        });
        setUserData(response.data);
        setProfileImage(response.data.imagen || DefaultProfile);
      } catch (error) {
        if (error.response?.status === 401) {
          alert("No estás autenticado. Redirigiendo al login.");
          navigate("/login");
        } else {
          console.error("Error al obtener el perfil del usuario:", error);
        }
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = async () => {
    try {
      const formData = new FormData();
      // Agregar el objeto usuario como JSON
      const userDataJson = JSON.stringify({
        nombre: userData.nombre,
        telefono: userData.telefono,
        direccion: userData.direccion,
        distrito: userData.distrito,
        departamento: userData.departamento,
      });
  
      formData.append("user", new Blob([userDataJson], { type: "application/json" })); // Enviar como JSON
      if (selectedImageFile) {
        formData.append("imagen", selectedImageFile); // Agregar la imagen
      }
  
      const response = await axios.put("http://localhost:8094/api/users/editar-perfil", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
  
      if (response.status === 200) {
        alert("Perfil actualizado con éxito.");
        setIsEditing(false);
        setProfileImage(URL.createObjectURL(selectedImageFile)); // Actualizar la vista previa
        setSelectedImageFile(null);
      }
    } catch (error) {
      alert("Error al actualizar el perfil.");
      console.error("Error al actualizar el perfil:", error);
    }
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImageFile(file); // Guardar el archivo seleccionado
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result); // Mostrar una vista previa de la imagen
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="perfil-wrapper">
      <div className="perfil-container">
        <div className="perfil-header">
          <div className="image-container">
            <img src={profileImage} alt="User" className="perfil-image" />
            {isEditing && (
              <>
                <input
                  type="file"
                  id="file-input" // ID único
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input"
                />
                <label htmlFor="file-input" className="file-label">
                  Cambiar Imagen
                </label>
              </>
            )}
          </div>
          <div className="perfil-info">
            {isEditing ? (
              <input
                type="text"
                name="nombre"
                value={userData.nombre}
                onChange={handleInputChange}
                className="input-field"
              />
            ) : (
              <h1 className="animated-font">{userData.nombre}</h1>
            )}
          </div>
        </div>
        <div className="perfil-body">
          {isEditing ? (
            <>
              <input
                type="text"
                name="telefono"
                value={userData.telefono}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Teléfono"
              />
              <input
                type="text"
                name="direccion"
                value={userData.direccion}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Dirección"
              />
              <input
                type="text"
                name="distrito"
                value={userData.distrito}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Distrito"
              />
              <input
                type="text"
                name="departamento"
                value={userData.departamento}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Departamento"
              />
            </>
          ) : (
            <>
              <p className="animated-font">Teléfono: {userData.telefono}</p>
              <p className="animated-font">Dirección: {userData.direccion}</p>
              <p className="animated-font">Distrito: {userData.distrito}</p>
              <p className="animated-font">Departamento: {userData.departamento}</p>
            </>
          )}
        </div>
        <div className="perfil-footer">
          {isEditing ? (
            <button className="perfil-button save-button" onClick={saveChanges}>
              Guardar
            </button>
          ) : (
            <button className="perfil-button edit-button" onClick={toggleEdit}>
              Editar Perfil
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Perfil.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
};

export default Perfil;
