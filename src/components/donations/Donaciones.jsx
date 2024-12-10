import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/donations/Donaciones.css";
import DonationModal from "./DonationModal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import DNImage1 from "../../assets/DN_01.webp";
import DNImage2 from "../../assets/DN_02.webp";
import DNImage3 from "../../assets/DN_03.webp";

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

        const productsWithImages = productResponse.data.map((product, index) => ({
          ...product,
          imagen: product.imagen || [DNImage1, DNImage2, DNImage3][index % 3], // Usa una imagen predeterminada
        }));

        setProducts(productsWithImages);
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
              src={product.imagen}
              alt={product.nombreProducto}
              className="donaciones-product-image"
            />
            <p className="product-name">{product.nombreProducto}</p>
            <p className="product-price">Precio: S/. {product.precio.toFixed(2)}</p>
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
