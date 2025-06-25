import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header style={{
      background: "#ffffffcc",
      padding: "1rem",
      display: "flex",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      backdropFilter: "blur(10px)",
      zIndex: 10
    }}>
      <h2 style={{ margin: 0 }}>HotelApp</h2>
      <nav>
        <Link to="/" style={{ marginRight: "1rem" }}>Inicio</Link>
        <Link to="/BuscadorHoteles">Alojamiento</Link>
        <Link to="/BusquedaDeActividades">Experiencias</Link>
        <Link to="/PerfilDeUsuario" style={{ marginLeft: "1rem" }}>Perfil</Link>
      </nav>
    </header>
  );
}
