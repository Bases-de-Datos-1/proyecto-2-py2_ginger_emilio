function Mantenimiento() {
    return (
        <div>
            <h1>Pantalla de Mantenimiento</h1>
            <ul>
                <li><a href="/admin/mantenimiento/hoteles">Hoteles</a></li>
                <li><a href="/admin/mantenimiento/habitaciones">Habitaciones</a></li>
                <li><a href="/admin/mantenimiento/clientes">Clientes</a></li>
                <button onClick={() => {
                    localStorage.clear(); 
                    window.location.href = '/admin';
                }}>Cerrar sesión</button>

            </ul>
        </div>
    );
}

export default Mantenimiento;
