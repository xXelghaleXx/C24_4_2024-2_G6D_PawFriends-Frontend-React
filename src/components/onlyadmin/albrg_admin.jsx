import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/onlyadmin/crear_albrg_admin.css';

const CrearAlbergue = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const albergue = location.state?.albergue; // Recibe el albergue si es edición

  // Estado inicial del formulario
  const [formData, setFormData] = useState({
    name: albergue ? albergue.name : '',
    description: albergue ? albergue.description : '',
    departamento: albergue ? albergue.departamento : '',
    direccion: albergue ? albergue.direccion : '',
    distrito: albergue ? albergue.distrito : '',
    images: albergue ? albergue.images : [],
  });

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar cambios en la selección de imágenes
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFormData({ ...formData, images: files });
    }
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (albergue) {
      // Lógica para editar el albergue existente
      console.log('Albergue actualizado:', formData);
      alert('¡Albergue actualizado con éxito!');
    } else {
      // Lógica para crear un nuevo albergue
      console.log('Nuevo albergue creado:', formData);
      alert('¡Albergue creado con éxito!');
    }
    navigate('/albergues'); // Redirigir a la página de albergues
  };

  return (
    <div>
      <br /><br /><br /><br /><br /><br />
      <div className="crear-albergue-container">
        <form onSubmit={handleSubmit} className="crear-albergue-form">
          <h1>{albergue ? 'Editar Albergue' : 'Crear Albergue'}</h1>

          {/* Campo: Nombre del albergue */}
          <div className="form-group">
            <label htmlFor="name">Nombre del Albergue</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ingresa el nombre del albergue"
              required
            />
          </div>

          {/* Campo: Descripción */}
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe el albergue"
              required
            />
          </div>

          {/* Campo: Departamento */}
          <div className="form-group">
            <label htmlFor="departamento">Departamento</label>
            <input
              type="text"
              id="departamento"
              name="departamento"
              value={formData.departamento}
              onChange={handleInputChange}
              placeholder="Ingresa el departamento"
              required
            />
          </div>

          {/* Campo: Dirección */}
          <div className="form-group">
            <label htmlFor="direccion">Dirección</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
              placeholder="Ingresa la dirección"
              required
            />
          </div>

          {/* Campo: Distrito */}
          <div className="form-group">
            <label htmlFor="distrito">Distrito</label>
            <input
              type="text"
              id="distrito"
              name="distrito"
              value={formData.distrito}
              onChange={handleInputChange}
              placeholder="Ingresa el distrito"
              required
            />
          </div>

          {/* Campo: Imagen */}
          <div className="form-group">
            <label htmlFor="images">Imagen</label>
            <input
              type="file"
              id="images"
              name="images"
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: 'none' }} // Oculta el botón predeterminado
            />
            <label htmlFor="images" className="custom-file-upload">
              Seleccionar archivo
            </label>
          </div>

          <button type="submit" className="crear-albergue-btn">
            {albergue ? 'Actualizar Albergue' : 'Crear Albergue'}
          </button>
        </form>
      </div>
      <br /><br /><br /><br />
    </div>
  );
};

export default CrearAlbergue;
