import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/onlyadmin/crear_albrg_admin.css';

// Configuración global de Axios
axios.defaults.baseURL = "http://localhost:8000/";

const CrearAlbergue = () => {
  const navigate = useNavigate();

  // Estado inicial del formulario
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    departamento: '',
    direccion: '',
    distrito: '',
    telefono: '',
    imagen: null, // Solo una imagen
  });

  const [imagenExistente, setImagenExistente] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const correoUsuario = "angel@gmail.com"; // Correo específico proporcionado

  // Obtener los datos existentes del albergue
  useEffect(() => {
    const fetchAlbergue = async () => {
      try {
        const response = await axios.get(`albergues/detalle/?correo=${encodeURIComponent(correoUsuario)}`);
        const albergue = response.data;

        setFormData({
          name: albergue.nombre || '',
          description: albergue.descripcion || '',
          departamento: albergue.departamento || '',
          direccion: albergue.direccion || '',
          distrito: albergue.distrito || '',
          telefono: albergue.telefono || '',
          imagen: null,
        });

        setImagenExistente(albergue.imagen || '');
      } catch (err) {
        console.error('Error al obtener los datos del albergue:', err.response?.data || err.message);
        setError('No se pudo obtener la información del albergue.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlbergue();
  }, [correoUsuario]);

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar cambios en la selección de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imagen: file });
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = `albergues/editar/?correo=${encodeURIComponent(correoUsuario)}`;

    const data = new FormData();
    data.append('name', formData.name || '');
    data.append('description', formData.description || '');
    data.append('departamento', formData.departamento || '');
    data.append('direccion', formData.direccion || '');
    data.append('distrito', formData.distrito || '');
    data.append('telefono', formData.telefono || '');

    // Solo agregar la imagen si hay una nueva seleccionada
    if (formData.imagen) {
        data.append('imagen', formData.imagen);
    }

    try {
        setLoading(true);
        const response = await axios.post(endpoint, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status === 200) {
            alert('¡Albergue actualizado con éxito!');
            navigate('/admin'); // Redirigir a la página de albergues
        }
    } catch (error) {
        console.error('Error al enviar el formulario:', error.response?.data || error.message);
        alert(error.response?.data?.error || 'Ocurrió un error al guardar el albergue. Por favor, intenta nuevamente.');
    } finally {
        setLoading(false);
    }
};

  // Resetear el formulario (opcional)
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      departamento: '',
      direccion: '',
      distrito: '',
      telefono: '',
      imagen: null,
    });
    setImagenExistente('');
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <br /><br /><br /><br /><br /><br />
      <div className="crear-albergue-container">
        <form onSubmit={handleSubmit} className="crear-albergue-form">
          <h1>Editar Albergue</h1>

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

          {/* Campo: Teléfono */}
          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              placeholder="Ingresa el teléfono"
              required
            />
          </div>

          {/* Campo: Imagen */}
          <div className="form-group">
            <label htmlFor="imagen">Imagen</label>
            <input
              type="file"
              id="imagen"
              name="imagen"
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: 'none' }} // Oculta el botón predeterminado
            />
            <label htmlFor="imagen" className="custom-file-upload">
              {formData.imagen ? formData.imagen.name : 'Seleccionar imagen'}
            </label>
            {imagenExistente && (
              <div className="existing-image">
                <p>Imagen Actual:</p>
                <img src={imagenExistente} alt="Imagen del Albergue" width="200" />
              </div>
            )}
          </div>

          <button type="submit" className="crear-albergue-btn">
            Guardar Cambios
          </button>
        </form>
      </div>
      <br /><br /><br /><br />
    </div>
  );
};

export default CrearAlbergue;
