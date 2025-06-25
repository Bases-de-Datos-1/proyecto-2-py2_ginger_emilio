import React, { useEffect, useState, useCallback } from 'react';
import { buscarHabitaciones } from '../api';
import { useNavigate } from 'react-router-dom';

const BuscadorHoteles = () => {
  const [filtros, setFiltros] = useState({});
  const [habitaciones, setHabitaciones] = useState([]);
  const navigate = useNavigate();

  const handleBuscar = useCallback(async () => {
    try {
      const data = await buscarHabitaciones(filtros);
      setHabitaciones(data);
    } catch (err) {
      console.error('Error en la búsqueda:', err);
    }
  }, [filtros]);

  useEffect(() => {
    handleBuscar();
  }, [handleBuscar]);

  return (
    <>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Buscar habitaciones</h2>
          <div className="flex flex-wrap gap-4 mt-2">
            <input
              placeholder="Provincia"
              className="border p-2 rounded w-40"
              onChange={(e) => setFiltros((prev) => ({ ...prev, provincia: e.target.value }))}
            />
            <input
              placeholder="Capacidad mínima"
              type="number"
              className="border p-2 rounded w-40"
              onChange={(e) => setFiltros((prev) => ({ ...prev, capacidad_min: e.target.value }))}
            />
            <input
              placeholder="Precio máximo"
              type="number"
              className="border p-2 rounded w-40"
              onChange={(e) => setFiltros((prev) => ({ ...prev, precio_max: e.target.value }))}
            />
            <button
              onClick={handleBuscar}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Buscar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {habitaciones.map((hab) => (
            <div
              key={hab.id_habitacion}
              className="bg-white shadow rounded overflow-hidden cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate('/reservando')}
            >
              {hab.url_foto ? (
                <img src={hab.url_foto} alt="Habitación" className="h-48 w-full object-cover" />
              ) : (
                <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                  Sin imagen
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{hab.tipo_habitacion}</h3>
                <p className="text-gray-600">₡{hab.precio?.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BuscadorHoteles;
