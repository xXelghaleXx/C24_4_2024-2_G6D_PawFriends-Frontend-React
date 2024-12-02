import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../css/ChatAlbergues.css";

const ChatAlbergue = () => {
  const [searchParams] = useSearchParams();
  const albergue = searchParams.get("albergue") || "Albergue desconocido";

  // Estado para los mensajes del chat
  const [messages, setMessages] = useState([
    { sender: "albergue", text: "¡Hola! ¿Cómo podemos ayudarte?" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  // Manejar envío de mensajes
  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { sender: "user", text: newMessage }]);
      setNewMessage("");
      // Simular respuesta del albergue
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "albergue", text: "Estamos revisando tu mensaje." },
        ]);
      }, 1000);
    }
  };

  return (
    <div>
        <br /><br /><br /><br /><br /><br /><br />
    <div className="chat-albergue-container">
      {/* Header del chat */}
      <header className="chat-header">
        <h2>Chat con {albergue}</h2>
      </header>

      {/* Cuerpo del chat */}
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender === "user" ? "user-message" : "albergue-message"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input para escribir mensajes */}
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="chat-input"
        />
        <button onClick={handleSendMessage} className="send-button">
          Enviar
        </button>
      </div>
    </div>
    <br /><br /><br /><br /><br /><br /><br />
    </div>
  );
};

export default ChatAlbergue;
