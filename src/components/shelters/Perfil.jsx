import { useState } from "react";
import PropTypes from "prop-types";
import "../../styles/shelters/PerfilStyles.css";
import DefaultProfile from "../../assets/user.png"; // Ruta a la imagen predeterminada

const Perfil = () => {
  const [isEditing, setIsEditing] = useState(false); // Estado para modo edición
  const [userData, setUserData] = useState({
    name: "Adrian",
    age: 30,
    email: "adrian@example.com",
    phone: "+51 987654321",
    address: "Av. Principal 123",
    district: "Miraflores",
    shelter: "Paw Shelter",
  });
  const [profileImage, setProfileImage] = useState(DefaultProfile); // Estado para la imagen de usuario

  // Manejar cambios en los campos de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Alternar entre modo edición y vista normal
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Guardar los cambios
  const saveChanges = () => {
    setIsEditing(false);
    console.log("Datos guardados:", userData);
  };

  // Cambiar la imagen de perfil
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result); // Actualiza la imagen con el contenido del archivo
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
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="input-field"
              />
            ) : (
              <h1 className="animated-font">{userData.name}</h1>
            )}
            {isEditing ? (
              <input
                type="number"
                name="age"
                value={userData.age}
                onChange={handleInputChange}
                className="input-field"
              />
            ) : (
              <h3>{userData.age} años</h3>
            )}
          </div>
        </div>
        <div className="perfil-body">
          {isEditing ? (
            <>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="input-field"
              />
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                className="input-field"
              />
              <input
                type="text"
                name="address"
                value={userData.address}
                onChange={handleInputChange}
                className="input-field"
              />
              <input
                type="text"
                name="district"
                value={userData.district}
                onChange={handleInputChange}
                className="input-field"
              />
            </>
          ) : (
            <>
              <p className="animated-font">Correo: {userData.email}</p>
              <p className="animated-font">Teléfono: {userData.phone}</p>
              <p className="animated-font">Dirección: {userData.address}</p>
              <p className="animated-font">Distrito: {userData.district}</p>
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
  age: PropTypes.number,
  email: PropTypes.string,
};

export default Perfil;
