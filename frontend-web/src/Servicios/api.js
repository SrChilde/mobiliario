const BASE_URL = "https://mobiliariobackend.onrender.com/api/mobiliario";

export async function getMobiliario() {
  try {
    console.log("Intentando conectar a:", BASE_URL);
    const res = await fetch(BASE_URL);
    
    if (!res.ok) {
        throw new Error(`Error del servidor: ${res.status}`);
    }
    
    const data = await res.json();
    console.log("Datos recibidos:", data);
    return data;
  } catch (error) {
    console.error("Error detallado en fetch:", error);
    throw error;
  }
}

export async function crearMobiliario(payload) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Error creando mueble");
  }

  return res.json();
}

export async function actualizarMobiliario(id, payload) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Error actualizando mobiliario");
  }

  return res.json();
}