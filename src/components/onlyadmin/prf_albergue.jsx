// src/components/PrfAlbergue.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/onlyadmin/prf_albergue.css";
import DefaultProfile from "../../assets/user.png"; // Ruta a la imagen predeterminada

// Configuración global de Axios
axios.defaults.baseURL = "http://localhost:8000/";

const PrfAlbergue = () => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false); // Estado para modo edición
  const [userData, setUserData] = useState({
    nombre: "",
    correo: "",
    departamento: "",
    direccion: "",
    distrito: "",
    telefono: "",
    tipo_usuario: "",
    imagen: null, // Para manejar la imagen seleccionada
  });
  const [profileImage, setProfileImage] = useState(DefaultProfile); // Estado para la imagen de usuario
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const correoUsuario = "qwertmarcelo3@gmail.com"; // Correo específico proporcionado

  // Obtener los datos del perfil al cargar el componente
  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await axios.get(`/perfil/ver/?correo=${encodeURIComponent(correoUsuario)}`);
        const data = response.data;
        setUserData({
          nombre: data.nombre || "",
          correo: data.correo || "",
          departamento: data.departamento || "",
          direccion: data.direccion || "",
          distrito: data.distrito || "",
          telefono: data.telefono || "",
          tipo_usuario: data.tipo_usuario || "",
          imagen: null,
        });
        setProfileImage(data.imagen || DefaultProfile);
      } catch (err) {
        console.error("Error al obtener el perfil:", err.response?.data || err.message);
        setError("No se pudo obtener la información del perfil.");
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, [correoUsuario]);

  // Manejar cambios en los campos de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Cambiar la imagen de perfil
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecciona un archivo de imagen válido.');
        return;
      }

      setUserData((prevData) => ({
        ...prevData,
        imagen: file,
      }));

      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result); // Actualiza la imagen con el contenido del archivo
      };
      reader.onerror = () => {
        console.error('Error al leer el archivo.');
        alert('Ocurrió un error al procesar la imagen.');
      };
      reader.readAsDataURL(file);
    }
  };

  // Alternar entre modo edición y vista normal
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Guardar los cambios
  const saveChanges = async () => {
    const endpoint = `/perfil/editar/?correo=${encodeURIComponent(correoUsuario)}`;
    const data = new FormData();

    // Crear el objeto data como JSON string
    const dataObj = {
      nombre: userData.nombre,
      departamento: userData.departamento,
      direccion: userData.direccion,
      distrito: userData.distrito,
      telefono: userData.telefono,
      tipo_usuario: userData.tipo_usuario,
    };
    data.append("data", JSON.stringify(dataObj));

    // Añadir la imagen al FormData si se ha seleccionado
    if (userData.imagen) {
      data.append("imagen", userData.imagen);
    }

    try {
      setLoading(true);
      const response = await axios.post(endpoint, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("Perfil actualizado con éxito!");
        setIsEditing(false);
        // Refrescar los datos del perfil
        const updatedResponse = await axios.get(`/perfil/ver/?correo=${encodeURIComponent(correoUsuario)}`);
        const updatedData = updatedResponse.data;
        setUserData({
          nombre: updatedData.nombre || "",
          correo: updatedData.correo || "",
          departamento: updatedData.departamento || "",
          direccion: updatedData.direccion || "",
          distrito: updatedData.distrito || "",
          telefono: updatedData.telefono || "",
          tipo_usuario: updatedData.tipo_usuario || "",
          imagen: null,
        });
        setProfileImage(updatedData.imagen || DefaultProfile);
      }
    } catch (err) {
      console.error("Error al actualizar el perfil:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Ocurrió un error al actualizar el perfil.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="prfalbergue-wrapper">
      <div className="prfalbergue-container">
        <div className="prfalbergue-header">
          <div className="prfalbergue-image-container">
            <img src={profileImage} alt="User" className="prfalbergue-image" />
            {isEditing && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="prfalbergue-file-input"
                  id="file-input" // Asegurar que el id coincide con el htmlFor del label
                />
                <label htmlFor="file-input" className="prfalbergue-file-label">
                  Cambiar Imagen
                </label>
              </>
            )}
          </div>
          <div className="prfalbergue-info">
            {isEditing ? (
              <input
                type="text"
                name="nombre"
                value={userData.nombre}
                onChange={handleInputChange}
                className="prfalbergue-input-field"
                placeholder="Nombre"
              />
            ) : (
              <h1 className="prfalbergue-animated-font">{userData.nombre}</h1>
            )}
            {isEditing ? (
              <input
                type="text"
                name="tipo_usuario"
                value={userData.tipo_usuario}
                onChange={handleInputChange}
                className="prfalbergue-input-field"
                placeholder="Tipo de Usuario"
              />
            ) : (
              <h3>{userData.tipo_usuario}</h3>
            )}
          </div>
        </div>
        <div className="prfalbergue-body">
          {isEditing ? (
            <>
              <input
                type="email"
                name="correo"
                value={userData.correo}
                onChange={handleInputChange}
                className="prfalbergue-input-field"
                placeholder="Correo"
                disabled // Usualmente, el correo no es editable
              />
              <input
                type="text"
                name="departamento"
                value={userData.departamento}
                onChange={handleInputChange}
                className="prfalbergue-input-field"
                placeholder="Departamento"
              />
              <input
                type="text"
                name="direccion"
                value={userData.direccion}
                onChange={handleInputChange}
                className="prfalbergue-input-field"
                placeholder="Dirección"
              />
              <input
                type="text"
                name="distrito"
                value={userData.distrito}
                onChange={handleInputChange}
                className="prfalbergue-input-field"
                placeholder="Distrito"
              />
              <input
                type="text"
                name="telefono"
                value={userData.telefono}
                onChange={handleInputChange}
                className="prfalbergue-input-field"
                placeholder="Teléfono"
              />
            </>
          ) : (
            <>
              <p className="prfalbergue-animated-font">Correo: {userData.correo}</p>
              <p className="prfalbergue-animated-font">Departamento: {userData.departamento}</p>
              <p className="prfalbergue-animated-font">Dirección: {userData.direccion}</p>
              <p className="prfalbergue-animated-font">Distrito: {userData.distrito}</p>
              <p className="prfalbergue-animated-font">Teléfono: {userData.telefono}</p>
            </>
          )}
        </div>
        <div className="prfalbergue-footer">
          {isEditing ? (
            <button
              className="prfalbergue-button prfalbergue-save-button"
              onClick={saveChanges}
              disabled={loading}
            >
              Guardar
            </button>
          ) : (
            <button
              className="prfalbergue-button prfalbergue-edit-button"
              onClick={toggleEdit}
            >
              Editar Perfil
            </button>
          )}
        </div>
      </div>
      <br /><br /><br /><br />
    </div>
  );
};

export default PrfAlbergue;
