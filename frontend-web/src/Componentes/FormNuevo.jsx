import { useState } from "react";
import './FormNuevo.css';

function FormNuevo({ onGuardar, loading }) {
  const [codigo, setCodigo] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("Disponible");
  const [ubicacion, setUbicacion] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    // Validación frontend
    if (!codigo.trim() || !titulo.trim() || !descripcion.trim()) {
      setMsg("Código, título y descripción son obligatorios.");
      return;
    }
    if (titulo.trim().length < 3) {
      setMsg("El título debe tener al menos 3 caracteres.");
      return;
    }

    // Ejecuta guardado (Home maneja el try/catch)
    const ok = await onGuardar({
      codigo: codigo.trim().toUpperCase(),
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      estado: estado,
      ubicacion: ubicacion.trim(),
      cantidad: cantidad,
      observaciones: observaciones.trim(),
    });

    // Si Home devuelve true, limpiamos
    if (ok) {
      setCodigo("");
      setTitulo("");
      setDescripcion("");
      setEstado("Disponible");
      setUbicacion("");
      setCantidad("");
      setObservaciones("");
    }
  };

  return (
    <form onSubmit={submit} className="form-nuevo">
      <h3 className="form-nuevo__title">Nuevo Mobiliario</h3>

      <div className="form-nuevo__group">
        <input
          type="text"
          placeholder="Código (ej: MOB-001)"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          disabled={loading}
          className="form-nuevo__input"
        />
      </div>

      <div className="form-nuevo__group">
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          disabled={loading}
          className="form-nuevo__input"
        />
      </div>

      <div className="form-nuevo__group">
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          disabled={loading}
          className="form-nuevo__input"
        />
      </div>

      <div className="form-nuevo__group">
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          disabled={loading}
          className="form-nuevo__select"
        >
          <option value="Disponible">Disponible</option>
          <option value="Asignado">Asignado</option>
          <option value="Dañado">Dañado</option>
          <option value="En Proceso">En Proceso</option>
        </select>
      </div>

      <div className="form-nuevo__group">
        <input
          type="text"
          placeholder="Ubicación"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          disabled={loading}
          className="form-nuevo__input"
        />
      </div>

      <div className="form-nuevo__group">
        <input
          type="number"
          placeholder="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          disabled={loading}
          className="form-nuevo__input"
        />
      </div>

      <div className="form-nuevo__group">
        <input
          type="text"
          placeholder="Observaciones"
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
          disabled={loading}
          className="form-nuevo__input"
        />
      </div>


      <button type="submit" disabled={loading} className="form-nuevo__button">
        {loading ? "Guardando..." : "Guardar"}
      </button>

      {msg && <p className="form-nuevo__error">{msg}</p>}
    </form>
  );
}

export default FormNuevo;
