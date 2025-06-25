import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeaderAdmin from "./components/HeaderAdmin";
import FooterAdmin from "./components/FooterAdmin";

import Inicio from "./pages/Inicio";
import AdminLogin from "./pages/AdminLogin";
import Mantenimiento from "./pages/Mantenimiento";
import MantenimientoHoteles from './pages/MantenimientoHoteles';

import BuscadorHoteles from "./pages/BuscadorHoteles";
import RutaPrivada from "./components/RutaPrivada";

function Layout() {
    const location = useLocation();

    const isAdminLogin = location.pathname === '/admin';
    const isAdminSection = location.pathname.startsWith('/admin/') && !isAdminLogin;

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            {!isAdminLogin && (isAdminSection ? <HeaderAdmin /> : <Header />)}

            <main style={{ flex: 1 }}>
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/buscadorHoteles" element={<BuscadorHoteles />} />
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route path="/admin/mantenimiento" element={
                        <RutaPrivada>
                            <Mantenimiento />
                        </RutaPrivada>
                    } />
                    <Route path="/admin/mantenimiento/hoteles" element={
                        <RutaPrivada>
                            <MantenimientoHoteles />
                        </RutaPrivada>
                        } />
                </Routes>
            </main>

            {!isAdminLogin && (isAdminSection ? <FooterAdmin /> : <Footer />)}
        </div>
    );
}

function App() {
    return (
        <Router>
            <Layout />
        </Router>
    );
}

export default App;
