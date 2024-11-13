import '../css/TerminosLegales.css'; // Importar estilos

const TerminosLegales = () => {
  return (
    <div className="terminos-container">
      <div className="terminos-card">
        <h1 className="terminos-titulo">Términos Legales de PawFriends</h1>
        <div className="terminos-contenido">
          <h2>1. Adopción de Mascotas</h2>
          <h3>1.1. Proceso de Adopción</h3>
          <ul>
            <li>
              La adopción de mascotas a través de PawFriends es un servicio que conecta a adoptantes con refugios registrados en la plataforma.
            </li>
            <li>
              Los refugios tienen la responsabilidad de proporcionar información precisa y completa sobre las mascotas en adopción, incluyendo su estado de salud, comportamiento y necesidades especiales.
            </li>
            <li>
              El adoptante debe completar un formulario de evaluación, el cual será revisado por el refugio correspondiente para determinar su idoneidad como adoptante.
            </li>
          </ul>
          <h3>1.2. Requisitos del Adoptante</h3>
          <ul>
            <li>El adoptante debe ser mayor de edad y proporcionar información veraz en el formulario de adopción.</li>
            <li>
              El adoptante acepta cumplir con las condiciones establecidas por el refugio, las cuales pueden incluir visitas de seguimiento, acuerdos de cuidado y esterilización de la mascota.
            </li>
          </ul>
          <h3>1.3. Responsabilidades del Refugio</h3>
          <ul>
            <li>
              Los refugios son responsables de verificar que el adoptante cumpla con los requisitos establecidos para la adopción.
            </li>
            <li>
              PawFriends no asume responsabilidad por la selección del adoptante ni por el cumplimiento de las condiciones acordadas entre refugio y adoptante.
            </li>
          </ul>
          <h3>1.4. Exclusión de Responsabilidad</h3>
          <ul>
            <li>
              PawFriends actúa únicamente como intermediario en el proceso de adopción y no garantiza la compatibilidad entre adoptante y mascota.
            </li>
            <li>
              En caso de conflictos o incumplimientos, estos deberán ser resueltos entre el adoptante y el refugio.
            </li>
          </ul>
          <h3>Contacto</h3>
          <p>
            Si tienes dudas sobre estos términos, puedes escribirnos a:
          </p>
          <p>
            <strong>Correo electrónico:</strong> soporte@pawfriends.com
          </p>
          <p>
            <strong>Teléfono:</strong> +51 123 456 789
          </p>
        </div>
      </div>
    </div>
  );
};

export default TerminosLegales;
