import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/donations/Donaciones.css";
import DonationModal from "./DonationModal"; // Componente del modal
import { Elements } from "@stripe/react-stripe-js"; // Importar Elements
import { loadStripe } from "@stripe/stripe-js"; // Importar Stripe

// Clave pública de Stripe (reemplázala con tu clave)
const stripePromise = loadStripe("pk_test_51QTv3FRwW1GMSsQzfzmR7XmFNXOnaxdKDRccmLNdlDruKHcoviOZepAnRL1VrSMSV4jgKtoiRS1aKz3f0uNffp5d00qn09p42k");

const Donaciones = () => {
  const [products, setProducts] = useState([]);
  const [shelters, setShelters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProductsAndShelters = async () => {
      try {
        const [productResponse, shelterResponse] = await Promise.all([
          axios.get("http://localhost:8094/api/donaciones/productos"),
          axios.get("http://localhost:8094/api/donaciones/albergues"),
        ]);

        console.log("Respuesta de shelters:", shelterResponse.data);

        setProducts(productResponse.data);
        setShelters(shelterResponse.data);
      } catch (error) {
        console.error("Error loading products or shelters:", error);
      }
    };

    fetchProductsAndShelters();
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="donaciones-container">
      <h2>Donaciones</h2>
      <h3>Productos Disponibles:</h3>
      <div className="donaciones-products">
        {products.map((product) => (
          <div key={product.idProducto} className="donaciones-product-card">
            <img
              src={product.imagen || "URL_DE_IMAGEN_POR_DEFECTO"}
              alt={product.nombreProducto}
              className="donaciones-product-image"
            />
            <p className="product-name">{product.nombreProducto}</p>
            <p className="product-price">Precio: ${product.precio.toFixed(2)}</p>
            <button className="donar-button" onClick={() => openModal(product)}>
              Donar
            </button>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <Elements stripe={stripePromise}>
          <DonationModal
            product={selectedProduct}
            shelters={shelters}
            onClose={closeModal}
          />
        </Elements>
      )}
    </div>
  );
};

export default Donaciones;
