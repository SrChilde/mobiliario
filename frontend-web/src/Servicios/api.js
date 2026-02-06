// Agregamos /api/mobiliario al final de la URL
const BASE_URL = "https://mobiliariobackend.onrender.com/api/mobiliario";

export async function getMobiliario() {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Error al obtener mobiliario");
    return await res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// Cambiamos el nombre de 'crearMueble' a 'crearMobiliario' 
// para que coincida con tu importación en el componente
export async function crearMobiliario(payload) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error al crear mueble");
  return res.json();
}