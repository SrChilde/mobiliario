import { useEffect, useState } from "react";
import { getMobiliario, crearMobiliario, actualizarMobiliario } from "../Servicios/api";

import FormNuevo from "../Componentes/FormNuevo";
import BarraEstados from "../Componentes/BarraEstados";
import Buscador from "../Componentes/Buscador";
import TarjetaItem from "../Componentes/TarjetaItem";
import Cargando from "../Componentes/Cargando";
import Modal from "../Componentes/Modal";
import FormEditar from "../Componentes/FormEditar";

function Inicio() {
  const [mobiliario, setMobiliario] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [loading, setLoading] = useState(true);

  const [guardando, setGuardando] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);
  const [actualizando, setActualizando] = useState(false);

  const [toast, setToast] = useState({ type: "", text: "" });

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast({ type: "", text: "" }), 3000);
  };

  const cargar = () => {
    setLoading(true);
    getMobiliario()
      .then(setMobiliario)
      .catch(() => showToast("error", "No se pudieron cargar los muebles."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    cargar();
  }, []);

  const guardarMobiliario = async (payload) => {
    try {
      setGuardando(true);
      await crearMobiliario(payload);
      showToast("success", "Mueble creado con éxito ✅");
      cargar();
      return true;
    } catch (e) {
      showToast("error", e.message || "Error guardando mueble");
      return false;
    } finally {
      setGuardando(false);
    }
  };

  const abrirEdicion = (item) => {
    setSeleccionado(item);
    setEditOpen(true);
  };

  const guardarCambios = async (payload) => {
    try {
      setActualizando(true);
      await actualizarMobiliario(seleccionado.id, payload);
      showToast("success", "Mueble actualizado ✅");
      setEditOpen(false);
      setSeleccionado(null);
      cargar();
      return true;
    } catch (e) {
      showToast("error", e.message || "Error actualizando");
      return false;
    } finally {
      setActualizando(false);
    }
  };

  const filtrados = mobiliario.filter((item) =>
    (item.codigo + " " + item.titulo + " " + item.descripcion)
      .toLowerCase()
      .includes(filtro.toLowerCase())
  );

  if (loading) return <Cargando />;

  return (
    <div className="app-container">
      <h2 className="page-title">Control de Mobiliario</h2>

      <BarraEstados
        type={toast.type}
        text={toast.text}
        onClose={() => setToast({ type: "", text: "" })}
      />

      <Buscador value={filtro} onChange={setFiltro} />

      <FormNuevo onGuardar={guardarMobiliario} loading={guardando} />

      {filtrados.length === 0 && <p>No hay muebles para mostrar</p>}

      <div className="tarjetas-grid">
        {filtrados.map((item) => (
          <TarjetaItem key={item.id} item={item} onEdit={abrirEdicion} />
        ))}
      </div>

      <Modal
        open={editOpen}
        title="Editar Item"
        onClose={() => setEditOpen(false)}
      >
        <FormEditar
          item={seleccionado}
          onGuardar={guardarCambios}
          loading={actualizando}
        />
      </Modal>
    </div>
  );
}

export default Inicio;
