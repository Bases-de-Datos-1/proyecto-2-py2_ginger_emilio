import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Estas serían tus "páginas"
function Home() {
  return <h2>Inicio del sistema hotelero</h2>;
}

function Establecimientos() {
  const [datos, setDatos] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/api/establecimientos')
      .then(res => res.json())
      .then(data => setDatos(data));
  }, []);
  
  return (
    <div>
      <h2>Establecimientos</h2>
      <ul>
        {datos.map(e => (
          <li key={e.id_establecimiento}>{e.nombre}</li>
        ))}
      </ul>
    </div>
  );
}

function Contacto() {
  return <h2>Página de contacto</h2>;
}

// Estructura principal
function App() {
  return (
    <Router>
      <div>
        {/* Menú de navegación */}
        <nav>
          <Link to="/">Inicio</Link> |{" "}
          <Link to="/establecimientos">Establecimientos</Link> |{" "}
          <Link to="/contacto">Contacto</Link>
        </nav>

        {/* Páginas según la ruta */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/establecimientos" element={<Establecimientos />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
