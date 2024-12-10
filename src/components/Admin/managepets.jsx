import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/admin/managepets.css";

// Configuración global de Axios
axios.defaults.baseURL = "http://localhost:8000/";

const ManagePets = () => {
  const [pets, setPets] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    raza: "",
    edad: "",
    tamano: "",
    sexo: "",
    vacunas_completas: "",
    esterilizado: "",
    descripcion: "",
    imagenes: null, // Campo para subir imágenes
  });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState(null);

  const userCorreo = "qwertmarcelo3@gmail.com"; // Cambia a un valor dinámico si es necesario

  // 🚀 Cargar la lista de mascotas desde la API de Django
  const fetchPets = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/mascotas/?correo=${userCorreo}`);
      setPets(response.data);
    } catch (error) {
      console.error("Error al cargar las mascotas:", error);
      alert("No se pudo cargar la lista de mascotas. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  // Se ejecuta al cargar el componente
  useEffect(() => {
    fetchPets();
  }, []);

  // 🔥 Añadir o actualizar una mascota
  const handleAddOrUpdatePet = async () => {
    const isUpdate = !!selectedPetId; // Comprueba si estamos actualizando
    const endpoint = isUpdate
      ? `/mascotas/actualizar/${selectedPetId}/?correo=${userCorreo}` // URL para actualizar
      : `/mascotas/crear/?correo=${userCorreo}`; // URL para crear

    try {
      const data = new FormData();
      for (const key in formData) {
        if (key === "imagenes" && formData.imagenes) {
          Array.from(formData.imagenes).forEach((file) =>
            data.append("imagenes", file)
          );
        } else {
          data.append(key, formData[key]);
        }
      }

      await axios.post(endpoint, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(isUpdate ? "Mascota actualizada exitosamente" : "Mascota creada exitosamente");
      fetchPets(); // Refresca la lista de mascotas después de actualizar/crear
      resetForm();
    } catch (error) {
      console.error("Error al guardar la mascota:", error.response?.data || error.message);
      alert(
        error.response?.data?.error ||
        `Error inesperado: ${error.message}`
      );
    }
  };

  // 🗑️ Eliminar mascota
  const handleDeletePet = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta mascota?")) {
        try {
            const response = await axios.post(`/mascotas/eliminar/${id}/?correo=${userCorreo}`);
            alert("Mascota eliminada exitosamente");
            fetchPets();
        } catch (error) {
            console.error("Error al eliminar la mascota:", error.response?.data || error.message);
            alert(error.response?.data?.error || "No se pudo eliminar la mascota. Intenta más tarde.");
        }
    }
};


  // ✍️ Actualizar los datos del formulario
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagenes") {
      setFormData({ ...formData, [name]: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 🔄 Resetear el formulario
  const resetForm = () => {
    setFormData({
      nombre: "",
      raza: "",
      edad: "",
      tamano: "",
      sexo: "",
      vacunas_completas: "",
      esterilizado: "",
      descripcion: "",
      imagenes: null,
    });
    setShowForm(false);
    setEditMode(false);
    setSelectedPetId(null);
  };

  // ✏️ Editar mascota
  const handleEditPet = (pet) => {
    setFormData({
      nombre: pet.nombre,
      raza: pet.raza,
      edad: pet.edad,
      tamano: pet.tamano,
      sexo: pet.sexo,
      vacunas_completas: pet.vacunas_completas ? "true" : "false",
      esterilizado: pet.esterilizado ? "true" : "false",
      descripcion: pet.descripcion,
    });
    setSelectedPetId(pet.id_perro);
    setEditMode(true);
    setShowForm(true);
  };

  return (
    <div className="manage-pets-container">
      <h1>Mis Mascotas</h1>

      {loading && <p>Cargando...</p>}

      <button
        className="add-pet-button"
        onClick={() => {
          resetForm();
          setShowForm(true);
        }}
      >
        Añadir Mascota
      </button>

      <div className="pets-list">
        {pets.map((pet) => (
          <div key={pet.id_perro} className="pet-card">
            {pet.imagenes && pet.imagenes.length > 0 && (
              <img src={pet.imagenes[0].url} alt={pet.nombre} className="pet-image" />
            )}
            <h2>{pet.nombre}</h2>
            <p>Raza: {pet.raza}</p>
            <p>Edad: {pet.edad} años</p>
            <p>Tamaño: {pet.tamano}</p>
            <p>Sexo: {pet.sexo}</p>
            <p>Vacunas completas: {pet.vacunas_completas ? "Sí" : "No"}</p>
            <p>Esterilizado: {pet.esterilizado ? "Sí" : "No"}</p>
            <p>Descripción: {pet.descripcion}</p>
            <button onClick={() => handleEditPet(pet)}>Editar</button>
            <button onClick={() => handleDeletePet(pet.id_perro)}>Eliminar</button>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editMode ? "Editar Mascota" : "Añadir Mascota"}</h2>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="raza"
              placeholder="Raza"
              value={formData.raza}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="edad"
              placeholder="Edad"
              value={formData.edad}
              onChange={handleInputChange}
            />
            <select name="tamano" value={formData.tamano} onChange={handleInputChange}>
              <option value="">Selecciona el tamaño</option>
              <option value="pequeño">Pequeño</option>
              <option value="mediano">Mediano</option>
              <option value="grande">Grande</option>
            </select>
            <select name="sexo" value={formData.sexo} onChange={handleInputChange}>
              <option value="">Sexo</option>
              <option value="macho">Macho</option>
              <option value="hembra">Hembra</option>
            </select>
            <select
              name="vacunas_completas"
              value={formData.vacunas_completas}
              onChange={handleInputChange}
            >
              <option value="">Vacunas completas</option>
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
            <select
              name="esterilizado"
              value={formData.esterilizado}
              onChange={handleInputChange}
            >
              <option value="">Esterilizado</option>
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
            <textarea
              name="descripcion"
              placeholder="Descripción"
              value={formData.descripcion}
              onChange={handleInputChange}
            />
            <input
              type="file"
              name="imagenes"
              multiple
              onChange={handleInputChange}
            />
            <div className="form-actions">
              <button className="save-pet-button" onClick={handleAddOrUpdatePet}>
                {editMode ? "Guardar Cambios" : "Añadir"}
              </button>
              <button className="cancel-button" onClick={resetForm}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePets;
