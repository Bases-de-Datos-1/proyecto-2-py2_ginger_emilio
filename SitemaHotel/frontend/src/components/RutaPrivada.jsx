import { Navigate } from 'react-router-dom';

function RutaPrivada({ children }) {
    const logueado = localStorage.getItem('adminLogueado') === 'true';
    return logueado ? children : <Navigate to="/admin" />;
}

export default RutaPrivada;
