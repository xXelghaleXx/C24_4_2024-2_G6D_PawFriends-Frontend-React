import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import "../../styles/shared/footer.css"; // Importamos los estilos únicos

const Footer = () => {
    const [isNearBottom, setIsNearBottom] = useState(false);
    const navigate = useNavigate(); // Inicializar el hook para redirigir

    const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight; // Posición actual de scroll más la altura de la ventana
        const pageHeight = document.documentElement.scrollHeight; // Altura total de la página

        // Cambiar el estado cuando el usuario se acerca a la parte inferior
        if (pageHeight - scrollPosition < 150) {
            setIsNearBottom(true); // Cambia el footer a color sólido
        } else {
            setIsNearBottom(false); // Cambia el footer a transparente
        }
    };

    const handleNavigation = (section) => {
        navigate(`/info-legal?section=${section}`); // Redirigir con query params
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        // Cleanup del evento cuando el componente se desmonta
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <footer className={`unique-footer ${isNearBottom ? "solid" : "transparent"}`}>
            <ul className="unique-footer-list">
                <li className="unique-footer-item">
                    <button
                        className="unique-footer-link"
                        onClick={() => handleNavigation("contacto")}
                    >
                        Contacto
                    </button>
                </li>
                <li className="unique-footer-item">
                    <button
                        className="unique-footer-link"
                        onClick={() => handleNavigation("terminos")}
                    >
                        Términos de Uso
                    </button>
                </li>
                <li className="unique-footer-item">
                    <button
                        className="unique-footer-link"
                        onClick={() => handleNavigation("privacidad")}
                    >
                        Política de Privacidad
                    </button>
                </li>
            </ul>
        </footer>
    );
};

export default Footer;
