const BASE_URL = "http://localhost:3001/api";

// Función genérica para peticiones GET
export async function apiGet(path, rol = "admin") {
  const response = await fetch(`${BASE_URL}/${path}?rol=${rol}`);
  if (!response.ok) throw new Error("Error en la solicitud GET");
  return response.json();
}

// Función genérica para peticiones POST
export async function apiPost(path, data, rol = "admin") {
  const response = await fetch(`${BASE_URL}/${path}?rol=${rol}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error("Error en la solicitud POST");
  return response.json();
}

// Función genérica para peticiones PUT
export async function apiPut(path, data, rol = "admin") {
  const response = await fetch(`${BASE_URL}/${path}?rol=${rol}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error("Error en la solicitud PUT");
  return response.json();
}

// Función genérica para DELETE
export async function apiDelete(path, rol = "admin") {
  const response = await fetch(`${BASE_URL}/${path}?rol=${rol}`, {
    method: "DELETE"
  });
  if (!response.ok) throw new Error("Error en la solicitud DELETE");
  return response.json();
}

export const buscarHabitaciones = async (filtros = {}) => {
  const query = new URLSearchParams(filtros).toString();
  const response = await fetch(`${BASE_URL}/habitaciones?${query}`);
  if (!response.ok) throw new Error('Error al obtener habitaciones');
  return await response.json();
};
