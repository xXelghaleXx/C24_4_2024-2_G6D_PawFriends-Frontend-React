// src/components/Footer.jsx
import '../css/Footer.css'; // Importamos los estilos únicos

const Footer = () => {
    return (
        <footer className="unique-footer">
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
