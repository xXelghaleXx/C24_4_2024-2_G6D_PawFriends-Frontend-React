import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import "../../styles/donations/StripePaymentModal.css";

const StripePaymentModal = ({ clientSecret, onClose, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isClosing, setIsClosing] = useState(false);

  const handlePayment = async () => {
    if (!stripe || !elements) {
      alert("Stripe no está cargado.");
      return;
    }

    try {
      const cardElement = elements.getElement(CardElement);

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        console.error("Error al procesar el pago:", error.message);
        alert(`Error al procesar el pago: ${error.message}`);
      } else {
        alert("Pago realizado con éxito 🎉");
        onPaymentSuccess();
        handleClose(); // Usar handleClose para animar el cierre
      }
    } catch (error) {
      console.error("Error al pagar:", error);
      alert("Error inesperado al realizar el pago.");
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    // Espera a que termine la animación antes de cerrar
    setTimeout(() => {
      onClose();
    }, 300); // Debe coincidir con la duración de la animación de cierre
  };

  return (
    <div className={`stripe-payment-modal ${isClosing ? "fadeOut" : ""}`}>
      <div className={`modal-content ${isClosing ? "slideDown" : ""}`}>
        <h2>Completar Pago</h2>
        <div className="card-input">
          <CardElement options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#495057',
                '::placeholder': {
                  color: '#6c757d',
                },
              },
              invalid: {
                color: '#dc3545',
              },
            },
          }} />
        </div>
        <div className="modal-actions">
          <button className="btn btn-back" onClick={handleClose}>
            Cancelar
          </button>
          <button className="btn btn-pay" onClick={handlePayment}>
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
};

StripePaymentModal.propTypes = {
  clientSecret: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onPaymentSuccess: PropTypes.func.isRequired,
};

export default StripePaymentModal;
