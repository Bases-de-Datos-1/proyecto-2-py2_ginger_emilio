import { useState, useEffect } from 'react';
import TablaHoteles from '../components/TablaHoteles';
import FormularioHotel from '../components/FormularioHotel';


function MantenimientoHoteles() {
    const [hoteles, setHoteles] = useState([]);
    const [hotelSeleccionado, setHotelSeleccionado] = useState(null);
    const [error, setError] = useState('');

    const cargarHoteles = async () => {
        try {
            const res = await fetch('/api/establecimientos');
            const data = await res.json();
            console.log("Hoteles cargados:", data);
            setHoteles(data);
        } catch (err) {
            setError('Error al cargar los hoteles');
        }
    };


    const actualizarHotel = async (datos) => {
        try {
          console.log("Datos enviados al backend:", datos);

          const res = await fetch(`http://localhost:3001/api/establecimientos/${datos.id_establecimiento}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos),
          });

          const result = await res.json();
          console.log("Respuesta JSON:", result);
          if (result.success) {
            alert('Hotel actualizado correctamente');
            cargarHoteles();
          } else {
            alert('Error al actualizar: ' + result.message);
            throw new Error(`Error HTTP ${res.status}`);
          }
        } catch (error) {
          console.error('Error al actualizar:', error);
          alert('Ocurrió un error al actualizar');
        }
      };

    const guardarHotel = async (datos) => {
        const url = datos.id_establecimiento
            ? `/api/establecimientos/${datos.id_establecimiento}`
            : '/api/establecimientos';

        const metodo = datos.id_establecimiento ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: metodo,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        const resultado = await response.json();
        console.log("Respuesta JSON:", resultado);

        if (resultado.success) {
            alert(resultado.message);
            cargarHoteles(); // para recargar la lista
        } else {
            throw new Error(resultado.message);
        }
    };


    useEffect(() => {
        cargarHoteles();
    }, []);

    return (
        <div>
            <h1>Mantenimiento de Hoteles</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <TablaHoteles
              hoteles={hoteles}
              onEditar={hotel => setHotelSeleccionado(hotel)}
              onEliminar={cargarHoteles}
            />

            {hotelSeleccionado !== undefined && (
              <FormularioHotel
                hotel={hotelSeleccionado}
                onGuardar={async () => {
                  await cargarHoteles();
                  setHotelSeleccionado(undefined);
                }}
                onCancelar={() => setHotelSeleccionado(undefined)}
              />
            )}


            <button onClick={() => setHotelSeleccionado(null)}>Agregar Nuevo Hotel</button>

        </div>
        
    );
}

export default MantenimientoHoteles;
