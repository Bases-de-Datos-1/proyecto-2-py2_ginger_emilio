import { Link } from "react-router-dom";

export default function Inicio() {
  return (
    <div style={{
      backgroundImage: "url('/inicio.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "90vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
      textShadow: "1px 1px 5px black"
    }}>
      <div style={{ textAlign: "center", background: "#00000055", padding: "2rem", borderRadius: "1rem" }}>
        <h1>Descubrí tu próximo destino</h1>
        <p>Explorá alojamientos únicos y experiencias inolvidables</p>
        <div style={{ marginTop: "1rem" }}>
          <Link to="/buscadorHoteles">
            <button style={buttonEstilo}>Alojamiento</button>
          </Link>
          <Link to="/busquedaActividades">
            <button style={{ ...buttonEstilo, marginLeft: "1rem" }}>Experiencias</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const buttonEstilo = {
  backgroundColor: "#ffffffdd",
  border: "none",
  padding: "0.75rem 1.5rem",
  fontSize: "1rem",
  borderRadius: "999px",
  cursor: "pointer",
  color: "#333"
};
