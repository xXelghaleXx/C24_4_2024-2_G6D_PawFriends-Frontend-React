import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import '../../styles/donations/CardInputForm.css'; // Asegúrate de que el archivo CSS esté en esta ruta

const CardInputForm = () => {
  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  return (
    <div className="card-input-form">
      <h4>Datos de la tarjeta</h4>
      <CardElement options={CARD_ELEMENT_OPTIONS} className="card-element" />
    </div>
  );
};

export default CardInputForm;
