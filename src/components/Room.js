import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Room = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages((prevMessages) => [...prevMessages, input]);
    setInput("");
  };

  return (
    <div>
      <h2>Room ID: {id}</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Room;
