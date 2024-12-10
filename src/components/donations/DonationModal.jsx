import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "../../styles/donations/DonationModal.css";
import StripePaymentModal from "./StripePaymentModal"; // Modal para Stripe

const DonationModal = ({ product, onClose, shelters }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedShelter, setSelectedShelter] = useState("");
  const [clientSecret, setClientSecret] = useState(""); // Para manejar pagos
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); // Estado para el modal de Stripe

  const totalPrice = quantity * product.precio;

  const handleDonate = async () => {
    if (!selectedShelter) {
      alert("Seleccione un albergue.");
      return;
    }

    const donationData = {
      usuario: { id: 1 }, // Cambia según tu lógica
      producto: { idProducto: product.idProducto },
      cantidad: quantity,
      fecha_donacion: new Date(),
      monto_total: totalPrice,
      albergue: { idAlbergue: Number(selectedShelter) },
    };

    try {
      const response = await axios.post(
        "http://localhost:8094/api/donaciones/guardar",
        donationData
      );

      setClientSecret(response.data.clientSecret); // Guardar clientSecret para el pago
      alert("Donación creada. Ahora puedes proceder al pago.");
    } catch (error) {
      console.error("Error al donar:", error.response?.data || error.message);
      alert("Error al registrar la donación.");
    }
  };

  const openPaymentModal = () => {
    if (!clientSecret) {
      alert("Primero debes registrar la donación.");
      return;
    }
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => setIsPaymentModalOpen(false);

  const handlePaymentSuccess = () => {
    alert("¡Gracias por tu donación! El pago fue exitoso.");
    onClose(); // Cierra ambos modales
  };

  return (
    <div className="donation-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{product.nombreProducto}</h2>
        </div>
        <div className="modal-body">
          <div className="product-image">
            <img
              src={product.imagen || "URL_DE_IMAGEN_POR_DEFECTO"}
              alt={product.nombreProducto}
            />
          </div>
          <div className="product-details">
            <h3>{product.nombreProducto}</h3>
            <p>
              <strong>Descripción:</strong> {product.descripcionProducto}
            </p>
            <p>
              <strong>Precio unitario:</strong>S/. {product.precio.toFixed(2)}
            </p>
            <p>
              <strong>Cantidad:</strong>
            </p>
            <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
              {[...Array(10)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
            <p>
              <strong>Total:</strong> S/. {totalPrice.toFixed(2)}
            </p>
            <p>
              <strong>Seleccionar albergue:</strong>
            </p>
            <select
              value={selectedShelter}
              onChange={(e) => setSelectedShelter(e.target.value)}
            >
              <option value="" disabled>
                Selecciona un albergue
              </option>
              {shelters.map((shelter) => (
                <option key={shelter.idAlbergue} value={shelter.idAlbergue}>
                  {shelter.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-back" onClick={onClose}>
            Regresar
          </button>
          <button
            className={`btn btn-donate ${!selectedShelter ? "disabled" : ""}`}
            onClick={handleDonate}
            disabled={!selectedShelter}
          >
            Donar
          </button>
          <button
            className="btn btn-pay"
            onClick={openPaymentModal}
            disabled={!clientSecret}
          >
            Pagar con Stripe
          </button>
        </div>
      </div>
      {isPaymentModalOpen && (
        <StripePaymentModal
          clientSecret={clientSecret}
          onClose={closePaymentModal}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

DonationModal.propTypes = {
  product: PropTypes.shape({
    idProducto: PropTypes.number.isRequired,
    nombreProducto: PropTypes.string.isRequired,
    descripcionProducto: PropTypes.string.isRequired,
    imagen: PropTypes.string,
    precio: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  shelters: PropTypes.arrayOf(
    PropTypes.shape({
      idAlbergue: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DonationModal;
