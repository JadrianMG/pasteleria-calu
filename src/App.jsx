import React, { useState } from "react";
import logo from "/Logo Reposteria Calu.png";
import qr from "/reposteriacalu_qr.png";

const bases = ["Vainilla", "Chocolate", "Red Velvet"];
const rellenos = ["Dulce de leche", "Crema", "Ganache", "Frutas"];
const coberturas = ["Chantilly", "Fondant", "Buttercream"];
const adornos = ["Frutillas", "Granola", "Confites", "Flores"];

const precios = {
  base: 1000,
  relleno: 800,
  cobertura: 1200,
  adorno: 200,
  peso: 500,
};

export default function App() {
  const [pastel, setPastel] = useState({
    base: "Vainilla",
    relleno: "Dulce de leche",
    cobertura: "Chantilly",
    adornos: [],
    peso: 1,
    altura: 10,
    ancho: 20,
  });

  const toggleAdorno = (adorno) => {
    setPastel((prev) => {
      const nuevos = prev.adornos.includes(adorno)
        ? prev.adornos.filter((a) => a !== adorno)
        : [...prev.adornos, adorno];
      return { ...prev, adornos: nuevos };
    });
  };

  const calcularPrecio = () => {
    const { adornos, peso } = pastel;
    return (
      precios.base +
      precios.relleno +
      precios.cobertura +
      adornos.length * precios.adorno +
      peso * precios.peso
    );
  };

  const generarMensaje = () => {
    return encodeURIComponent(
      `Hola, me gustaría hacerte un pedido...

Torta personalizada:
- Bizcochuelo: ${pastel.base}
- Relleno: ${pastel.relleno}
- Cobertura: ${pastel.cobertura}
- Adornos: ${pastel.adornos.join(", ") || "Ninguno"}
- Peso: ${pastel.peso} kg
- Altura: ${pastel.altura} cm
- Ancho: ${pastel.ancho} cm

Precio estimado: $${calcularPrecio()}`
    );
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <img src={logo} alt="Logo Calu" style={{ height: "80px", marginBottom: "1rem" }} />
      <h1>Pastelería Calu - Armá tu pastel</h1>

      <div>
        <label>Bizcochuelo: </label>
        <select onChange={(e) => setPastel({ ...pastel, base: e.target.value })}>
          {bases.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Relleno: </label>
        <select onChange={(e) => setPastel({ ...pastel, relleno: e.target.value })}>
          {rellenos.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Cobertura: </label>
        <select onChange={(e) => setPastel({ ...pastel, cobertura: e.target.value })}>
          {coberturas.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <p>Adornos:</p>
        {adornos.map((a) => (
          <label key={a} style={{ marginRight: "1rem" }}>
            <input
              type="checkbox"
              checked={pastel.adornos.includes(a)}
              onChange={() => toggleAdorno(a)}
            />
            {a}
          </label>
        ))}
      </div>

      <div>
        <label>Peso (kg): </label>
        <input
          type="number"
          value={pastel.peso}
          onChange={(e) => setPastel({ ...pastel, peso: parseFloat(e.target.value) })}
        />
      </div>

      <div>
        <label>Altura (cm): </label>
        <input
          type="number"
          value={pastel.altura}
          onChange={(e) => setPastel({ ...pastel, altura: parseFloat(e.target.value) })}
        />
      </div>

      <div>
        <label>Ancho (cm): </label>
        <input
          type="number"
          value={pastel.ancho}
          onChange={(e) => setPastel({ ...pastel, ancho: parseFloat(e.target.value) })}
        />
      </div>

      <h2>💰 Precio estimado: ${calcularPrecio()}</h2>

      <a
        href={`https://wa.me/5493624811896?text=${generarMensaje()}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          marginTop: "1rem",
          display: "inline-block",
          backgroundColor: "#25D366",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          textDecoration: "none",
        }}
      >
        📲 Pedir por WhatsApp
      </a>

      <div style={{ marginTop: "2rem" }}>
        <p>También podés escanear nuestro QR:</p>
        <img src={qr} alt="QR Calu" style={{ height: "150px" }} />
      </div>
    </div>
  );
}
