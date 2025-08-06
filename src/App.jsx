import React, { useState } from "react";
import logo from "/Logo Reposteria Calu.png";
import qr from "/reposteriacalu_qr.png";

const productos = ["Torta personalizada", "Tarta"];
const tiposTarta = ["Pastaflora", "Toffi", "CocoTart", "Lemon Pai", "Ricota Tart", "Cheesecake"];
const rellenosPastaflora = ["Dulce de leche", "Membrillo", "Batata", "Frutilla"];

export default function App() {
  const [producto, setProducto] = useState("Torta personalizada");
  const [textoTorta, setTextoTorta] = useState("");
  const [tarta, setTarta] = useState({
    tamaño: "8 cm",
    tipo: "Pastaflora",
    combinada: ["", "", "", ""],
    relleno: "",
    rellenosCombinados: ["", "", "", ""]
  });

  const calcularPrecioTarta = () => {
    if (tarta.tamaño === "8 cm") return 3000;
    if (tarta.tamaño === "22 cm combinada") return 12000;
    return tarta.tipo === "Pastaflora" ? 7000 : 10000;
  };

  const generarMensaje = () => {
    if (producto === "Torta personalizada") {
      return encodeURIComponent(
        `Hola, me gustaría hacerte un pedido...

Torta personalizada:
- Texto: ${textoTorta}`
      );
    }

    if (tarta.tamaño === "22 cm combinada") {
      const combinaciones = tarta.combinada
        .map((tipo, i) => {
          if (!tipo) return null;
          const relleno = tipo === "Pastaflora" ? ` (${tarta.rellenosCombinados[i]})` : "";
          return `1/4 ${tipo}${relleno}`;
        })
        .filter(Boolean)
        .join(" + ");

      return encodeURIComponent(
        `Hola, me gustaría pedir una Tarta combinada de 22 cm:
- Combinación: ${combinaciones}
- Precio estimado: $${calcularPrecioTarta()}`
      );
    }

    const relleno = tarta.tipo === "Pastaflora" ? `
- Relleno: ${tarta.relleno}` : "";

    return encodeURIComponent(
      `Hola, me gustaría pedir una Tarta:
- Tipo: ${tarta.tipo}
- Tamaño: ${tarta.tamaño}${relleno}
- Precio estimado: $${calcularPrecioTarta()}`
    );
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <img src={logo} alt="Logo Calu" style={{ height: "80px", marginBottom: "1rem" }} />
      <h1>Pastelería Calu - Pedí tu producto</h1>

      <div>
        <label>¿Qué querés pedir? </label>
        <select value={producto} onChange={(e) => setProducto(e.target.value)}>
          {productos.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      {producto === "Torta personalizada" && (
        <div>
          <label>Texto personalizado: </label>
          <input
            type="text"
            value={textoTorta}
            onChange={(e) => setTextoTorta(e.target.value)}
            placeholder="Ej: ¡Feliz cumple Lu!"
          />
        </div>
      )}

      {producto === "Tarta" && (
        <div>
          <label>Tamaño: </label>
          <select
            value={tarta.tamaño}
            onChange={(e) =>
              setTarta({ ...tarta, tamaño: e.target.value, tipo: "", combinada: ["", "", "", ""] })
            }
          >
            <option>8 cm</option>
            <option>22 cm</option>
            <option>22 cm combinada</option>
          </select>

          {tarta.tamaño === "22 cm combinada" ? (
            <div>
              {[0, 1, 2, 3].map((i) => (
                <div key={i}>
                  <label>{`1/4 tipo ${i + 1}: `}</label>
                  <select
                    value={tarta.combinada[i]}
                    onChange={(e) => {
                      const nuevas = [...tarta.combinada];
                      nuevas[i] = e.target.value;
                      setTarta({ ...tarta, combinada: nuevas });
                    }}
                  >
                    <option value="">(ninguno)</option>
                    {tiposTarta.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>

                  {tarta.combinada[i] === "Pastaflora" && (
                    <div>
                      <label>Relleno pastaflora #{i + 1}: </label>
                      <select
                        value={tarta.rellenosCombinados[i]}
                        onChange={(e) => {
                          const nuevosRellenos = [...tarta.rellenosCombinados];
                          nuevosRellenos[i] = e.target.value;
                          setTarta({ ...tarta, rellenosCombinados: nuevosRellenos });
                        }}
                      >
                        {rellenosPastaflora.map((r) => (
                          <option key={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div>
              <label>Tipo de tarta: </label>
              <select
                value={tarta.tipo}
                onChange={(e) => setTarta({ ...tarta, tipo: e.target.value })}
              >
                {tiposTarta.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>

              {tarta.tipo === "Pastaflora" && (
                <div>
                  <label>Relleno: </label>
                  <select
                    value={tarta.relleno}
                    onChange={(e) => setTarta({ ...tarta, relleno: e.target.value })}
                  >
                    {rellenosPastaflora.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <h2>💰 Precio estimado: ${calcularPrecioTarta()}</h2>

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
