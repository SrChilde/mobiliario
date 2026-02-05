import { useEffect, useState } from "react";
import './FormEditar.css';

function FormEditar({ item, onGuardar, loading }) {
  const [codigo, setCodigo] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("Disponible");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (item) {
      setCodigo(item.codigo || "");
      setTitulo(item.titulo || "");
      setDescripcion(item.descripcion || "");
      setEstado(item.estado || "Disponible");
    }
  }, [item]);

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!codigo.trim() || !titulo.trim() || !descripcion.trim()) {
      setMsg("Código, título y descripción son obligatorios.");
      return;
    }
    if (titulo.trim().length < 3) {
      setMsg("El título debe tener al menos 3 caracteres.");
      return;
    }

    const ok = await onGuardar({
      codigo: codigo.trim().toUpperCase(),
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      estado: estado,
    });

    if (!ok) setMsg("No se pudo actualizar (revisa el error).");
  };

  return (
    <form onSubmit={submit} className="form-editar">

      <div className="form-editar__group">
        <input
          type="text"
          placeholder="Código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          disabled={loading}
          className="form-editar__input"
        />
      </div>

      <div className="form-editar__group">
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          disabled={loading}
          className="form-editar__input"
        />
      </div>

      <div className="form-editar__group">
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          disabled={loading}
          className="form-editar__input"
        />
      </div>

      <div className="form-editar__group">
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          disabled={loading}
          className="form-editar__select"
        >
          <option value="Disponible">Disponible</option>
          <option value="Asignado">Asignado</option>
          <option value="Dañado">Dañado</option>
          <option value="En Proceso">En Proceso</option>
        </select>
      </div>

      <button type="submit" disabled={loading} className="form-editar__button">
        {loading ? "Actualizando..." : "Guardar cambios"}
      </button>

      {msg && <p className="form-editar__error">{msg}</p>}
    </form>
  );
}

export default FormEditar;
