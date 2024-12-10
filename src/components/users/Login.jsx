import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import '../../styles/users/FormStyles.css';
import GoogleIcon from '../../assets/google.png';

function Login() {
    const [formData, setFormData] = useState({
        correo: "",
        contraseña: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8094/api/users/login",
                formData,
                { withCredentials: true } // Asegura que las cookies se envíen/reciban
            );

            if (response.status === 200) {
                const { redirectUrl, usuario } = response.data;

                // Si el backend provee una URL de redirección, ir directamente
                if (redirectUrl) {
                    console.log(`Redirigiendo a: ${redirectUrl}`);
                    window.location.href = redirectUrl;
                } else {
                    // Si no hay redirección específica, navegar a "/welcome"
                    console.log(`Bienvenido, ${usuario.nombre}`);
                    navigate("/welcome", { state: { usuario } });
                }
            }
        } catch (error) {
            // Manejar errores de autenticación
            if (error.response && error.response.status === 401) {
                alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
            } else {
                console.error("Error al iniciar sesión:", error.message);
                alert("Ocurrió un error al iniciar sesión. Inténtalo más tarde.");
            }
        }
    };

    return (
        <div className="main-content">
            <div className="form-container">
                <form className="form" onSubmit={handleSubmit}>
                    <h2 className="form-title">Login</h2>
                    <div className="form-group">
                        <input
                            type="email"
                            id="correo"
                            name="correo"
                            value={formData.correo}
                            onChange={handleChange}
                            placeholder="Correo"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="contraseña"
                            name="contraseña"
                            value={formData.contraseña}
                            onChange={handleChange}
                            placeholder="Contraseña"
                            required
                        />
                    </div>
                    <button className="form-button" type="submit">Iniciar Sesión</button>

                    {/* Botón de Google con el ícono */}
                    <a href="http://localhost:8094/oauth2/authorization/google" style={{ textDecoration: 'none' }}>
                        <button className="form-button-google" type="button">
                            <img src={GoogleIcon} alt="Google icon" className="google-icon" />
                            Iniciar Sesión con Google
                        </button>
                    </a>

                    <div className="extra-options">
                        <p>No tienes cuenta? <Link to="/register">Regístrate</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
