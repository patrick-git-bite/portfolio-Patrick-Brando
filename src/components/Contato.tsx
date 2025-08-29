import React, { useState } from "react";

const Contato = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Enviando...");

    try {
      const res = await fetch("/api/sendmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, nickname, email, message }),
      });

      if (res.ok) {
        setStatus("Email enviado com sucesso!");
        setName("");
        setNickname("");
        setEmail("");
        setMessage("");
      } else {
        const data = await res.json();
        setStatus("Erro: " + data.message);
      }
    } catch (err) {
      setStatus("Erro ao enviar email");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Entre em contato</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Como prefere ser chamado"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          type="email"
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Sua ideia"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Enviar</button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default Contato;
