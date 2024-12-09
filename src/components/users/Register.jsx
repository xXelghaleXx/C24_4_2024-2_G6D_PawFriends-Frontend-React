import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    confirmacionContraseña: "",
    direccion: "",
    telefono: "",
    tipo_usuario: "Adoptante",
    departamento: "",
    distrito: "",
  });

  const [imagen, setImagen] = useState(null); // Nueva propiedad para la imagen
  const [isGoogleAuthenticated, setGoogleAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOAuthDetails = async () => {
      try {
        const response = await axios.get("http://localhost:8094/api/users/register", {
          withCredentials: true,
        });
        if (response.data.correo) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            correo: response.data.correo,
            nombre: response.data.nombre,
          }));
          setGoogleAuthenticated(true);
        }
      } catch (error) {
        console.error("Error al obtener detalles de OAuth2:", error);
      }
    };

    fetchOAuthDetails();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setImagen(e.target.files[0]); // Guarda la imagen seleccionada
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar contraseñas
    if (formData.contraseña !== formData.confirmacionContraseña) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    try {
      // Crear FormData para manejar el archivo de imagen
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (imagen) {
        data.append("imagen", imagen); // Agregar la imagen al formulario
      }

      const response = await axios.post("http://localhost:8094/api/users/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        alert("Registro exitoso. Ahora inicia sesión.");
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("Ocurrió un error al registrarse. Inténtalo más tarde.");
      }
    }
  };

  return (
    <div className="main-content">
      <div className="form-container register-form">
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="form-title register-title">Registro</h2>

          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}

          <div className="form-group">
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingresa tu nombre"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="Ingresa tu correo"
              required
              disabled={isGoogleAuthenticated}
            />
          </div>

          {!isGoogleAuthenticated && (
            <>
              <div className="form-group">
                <input
                  type="password"
                  id="contraseña"
                  name="contraseña"
                  value={formData.contraseña}
                  onChange={handleChange}
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="confirmacionContraseña"
                  name="confirmacionContraseña"
                  value={formData.confirmacionContraseña}
                  onChange={handleChange}
                  placeholder="Confirma tu contraseña"
                  required
                />
              </div>
            </>
          )}

          <div className="form-group">
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              placeholder="Ingresa tu dirección"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Ingresa tu teléfono"
              required
            />
          </div>

          <div className="form-group">
            <select
              id="tipo_usuario"
              name="tipo_usuario"
              value={formData.tipo_usuario}
              onChange={handleChange}
              required
            >
              <option value="Adoptante">Adoptante</option>
              <option value="Albergue">Albergue</option>
            </select>
          </div>

          <div className="form-group">
            <input
              type="text"
              id="departamento"
              name="departamento"
              value={formData.departamento}
              onChange={handleChange}
              placeholder="Ingresa tu departamento"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              id="distrito"
              name="distrito"
              value={formData.distrito}
              onChange={handleChange}
              placeholder="Ingresa tu distrito"
              required
            />
          </div>

          {/* Campo para subir imagen */}
          <div className="form-group">
            <input type="file" id="imagen" name="imagen" onChange={handleFileChange} />
          </div>

          <button className="form-button" type="submit">
            Registrar
          </button>

          <div className="extra-options">
            <p>
              ¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
