import { useState, useEffect } from 'react';
import '../css/Footer.css'; // Importamos los estilos únicos

const Footer = () => {
    const [isNearBottom, setIsNearBottom] = useState(false);

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

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // Cleanup del evento cuando el componente se desmonta
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <footer className={`unique-footer ${isNearBottom ? 'solid' : 'transparent'}`}>
            <ul className="unique-footer-list">
                <li className="unique-footer-item">
                    <a href="/contacto" className="unique-footer-link">Contacto</a>
                </li>
                <li className="unique-footer-item">
                    <a href="/terminos" className="unique-footer-link">Términos de Uso</a>
                </li>
                <li className="unique-footer-item">
                    <a href="/privacidad" className="unique-footer-link">Política de Privacidad</a>
                </li>
            </ul>
        </footer>
    );
};

export default Footer;
