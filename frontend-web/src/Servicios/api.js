const API_BASE_URL = "http://localhost:5292/api"; // Ajusta si tu backend usa otro puerto

// GET: Obtener todos los muebles
export const getMobiliario = async () => {
  const response = await fetch(`${API_BASE_URL}/mobiliario`);
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  return response.json();
};

// POST: Crear nuevo mueble
export const crearMobiliario = async (data) => {
  const response = await fetch(`${API_BASE_URL}/mobiliario`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error || `Error ${response.status}`);
  }
  
  return response.json();
};

// PUT: Actualizar un mueble existente
export const actualizarMobiliario = async (id, data) => {
  const response = await fetch(`${API_BASE_URL}/mobiliario/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error || `Error ${response.status}`);
  }
  
  return response.json();
};
