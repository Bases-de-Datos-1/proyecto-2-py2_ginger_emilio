import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    localStorage.removeItem('adminLogueado');

    try {
        const res = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (!res.ok) {
            let errorData;
            try {
                errorData = await res.json();
            } catch (e) {
                errorData = { message: 'Error inesperado' };
            }

            setError(errorData.message || 'Credenciales inválidas');
            return;
        }

        const data = await res.json();

        if (data.success) {
            localStorage.setItem('adminLogueado', 'true');
            navigate('/admin/Mantenimiento');
        } else {
            setError(data.message || 'Login fallido');
        }
    } catch (err) {
        console.error(err);
        setError('Error de red o del servidor');
    }
};



    return (
        <div>
            <h2>Inicio de Sesión - Administrador</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Ingresar</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default AdminLogin;
