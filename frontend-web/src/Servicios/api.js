// Reemplaza con la URL que te de Render para el nuevo backend
const BASE_URL = "https://mobiliariobackend.onrender.com";

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

export async function crearMueble(payload) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error al crear mueble");
  return res.json();
}