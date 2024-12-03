import '../../styles/shared/TerminosLegales.css'; // Importar estilos

const TerminosLegales = () => {
  return (
    <div>
      <br /><br /><br /><br /><br /><br /><br /><br />
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
                Cada albergue tiene la responsabilidad de crear un formulario personalizado para evaluar la idoneidad del adoptante. Este formulario puede incluir preguntas sobre el entorno familiar, experiencia previa con mascotas, y compromiso con su cuidado.
              </li>
              <li>
                El adoptante debe completar el formulario proporcionado por el albergue. Basado en las respuestas, el albergue decidirá si el adoptante es adecuado para la adopción.
              </li>
              <li>
                En caso de ser aprobado, la recogida de la mascota debe realizarse directamente en el albergue correspondiente. PawFriends no se involucra en el traslado de las mascotas.
              </li>
            </ul>
            <h3>1.2. Requisitos del Adoptante</h3>
            <ul>
              <li>El adoptante debe ser mayor de edad y proporcionar información veraz en el formulario de adopción.</li>
              <li>
                El adoptante acepta cumplir con las condiciones establecidas por el albergue, las cuales pueden incluir visitas de seguimiento, acuerdos de cuidado y esterilización de la mascota.
              </li>
            </ul>
            <h3>1.3. Responsabilidades del Refugio</h3>
            <ul>
              <li>
                Los refugios son responsables de verificar que el adoptante cumpla con los requisitos establecidos en su formulario personalizado.
              </li>
              <li>
                Los refugios deben proporcionar información precisa y completa sobre las mascotas en adopción, incluyendo su estado de salud, comportamiento y necesidades especiales.
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
              <li>
                La responsabilidad de entregar la mascota en condiciones óptimas recae exclusivamente en el albergue.
              </li>
            </ul>

            <h2>2. Donaciones</h2>
            <h3>2.1. Proceso de Donación</h3>
            <ul>
              <li>
                Las donaciones realizadas a través de PawFriends se destinan exclusivamente a los refugios registrados en la plataforma.
              </li>
              <li>
                Los usuarios pueden optar por donar productos o dinero, según las opciones disponibles en la plataforma.
              </li>
            </ul>
            <h3>2.2. Exclusión de Responsabilidad</h3>
            <ul>
              <li>
                PawFriends no se hace responsable del mal uso de los fondos o productos donados por parte de los refugios.
              </li>
              <li>
                Es responsabilidad de los refugios proporcionar transparencia sobre la utilización de las donaciones.
              </li>
            </ul>

            <h2>3. Privacidad y Seguridad</h2>
            <h3>3.1. Protección de Datos</h3>
            <ul>
              <li>
                PawFriends recopila y almacena datos personales de los usuarios con el propósito de brindar los servicios ofrecidos en la plataforma.
              </li>
              <li>
                La información personal no será compartida con terceros sin el consentimiento del usuario, salvo en los casos requeridos por ley.
              </li>
            </ul>
            <h3>3.2. Seguridad de la Información</h3>
            <ul>
              <li>
                Implementamos medidas de seguridad para proteger los datos personales de los usuarios. Sin embargo, no garantizamos una seguridad absoluta contra accesos no autorizados.
              </li>
              <li>
                Los usuarios son responsables de mantener la confidencialidad de sus credenciales de acceso.
              </li>
            </ul>

            <h2>4. Uso de la Plataforma</h2>
            <h3>4.1. Condiciones Generales</h3>
            <ul>
              <li>
                Los usuarios deben utilizar la plataforma de manera responsable y cumplir con todas las leyes aplicables.
              </li>
              <li>
                Está prohibido publicar información falsa, ofensiva o engañosa en la plataforma.
              </li>
            </ul>
            <h3>4.2. Suspensión de Cuentas</h3>
            <ul>
              <li>
                PawFriends se reserva el derecho de suspender o eliminar cuentas de usuarios que infrinjan estos términos o realicen actividades sospechosas.
              </li>
            </ul>

            <h2>5. Contacto y Resolución de Conflictos</h2>
            <ul>
              <li>
                Para consultas o problemas relacionados con el uso de la plataforma, los usuarios pueden ponerse en contacto con nuestro equipo de soporte.
              </li>
              <li>
                En caso de disputas entre usuarios y refugios, PawFriends actuará como intermediario solo si ambas partes lo solicitan.
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
              <strong>Teléfono:</strong> +51 903 095 523
            </p>
          </div>
        </div>
      </div>
      <br /><br /><br /><br /><br /><br />
    </div>
  );
};

export default TerminosLegales;
