function TablaHoteles({ hoteles, onEditar, onEliminar }) {
    return (
        <table border="1" cellPadding="8" style={{ width: '100%', marginTop: '20px' }}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Cédula Jurídica</th>
                    <th>Tipo</th>
                    <th>Servicio</th>
                    <th>Provincia</th>
                    <th>Cantón</th>
                    <th>Distrito</th>
                    <th>Barrio</th>
                    <th>Dirección</th>
                    <th>GPS</th>
                    <th>Red Social</th>
                    <th>Contacto</th>
                    <th>Sitio Web</th>
                    <th>Acciones</th>
                </tr>
                </thead>
            <tbody>
                {hoteles.map((hotel, index) => (
                    <tr key={index}>
                    <td>{hotel.id_establecimiento}</td>   
                    <td>{hotel.nombre}</td>
                    <td>{hotel.cedula_juridica}</td>
                    <td>{hotel.tipo_establecimiento}</td>
                    <td>{hotel.nombre_servicio || '—'}</td>
                    <td>{hotel.provincia}</td>
                    <td>{hotel.canton}</td>
                    <td>{hotel.distrito}</td>
                    <td>{hotel.barrio}</td>
                    <td>{hotel.senas_exactas}</td>
                    <td>{hotel.referencia_gps}</td>
                    <td>
                        {hotel.nombre_red_social && (
                        <a href={hotel.url_red_social} target="_blank" rel="noopener noreferrer">
                            {hotel.nombre_red_social}
                        </a>
                        )}
                    </td>
                    <td>
                        {hotel.correo} <br />
                        {hotel.telefono1}<br />
                        {hotel.telefono2}<br />
                        {hotel.telefono3}
                    </td>
                    <td>
                        <a href={hotel.url_sitio_web} target="_blank" rel="noopener noreferrer">
                        {hotel.url_sitio_web}
                        </a>
                    </td>
                    <td>
                        <button onClick={() => onEditar(hotel)}>Editar</button>
                        <button onClick={async () => {
                        if (window.confirm('¿Eliminar este hotel?')) {
                            await fetch(`/api/establecimientos/${hotel.id_establecimiento}`, {
                            method: 'DELETE'
                            });
                            onEliminar();
                        }
                        }}>Eliminar</button>
                    </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TablaHoteles;
