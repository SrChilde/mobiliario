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


  const [nuevoModalOpen, setNuevoModalOpen] = useState(false);

  const guardarMobiliario = async (payload) => {
    try {
      setGuardando(true);
      await crearMobiliario(payload);
      showToast("Éxito", "Item creado con éxito ✅");
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
      showToast("Éxito", "Item actualizado ✅");
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

      <div className="acciones-primarias">
        <button onClick={() => setNuevoModalOpen(true)} className="boton-agregar">
          <span>+</span> Agregar Nuevo Mobiliario
        </button>
      </div>

      {filtrados.length === 0 && <p>No hay muebles para mostrar</p>}

      <div className="tarjetas-grid">
        {filtrados.map((item) => (
          <TarjetaItem key={item.id} item={item} onEdit={abrirEdicion} />
        ))}
      </div>

      <Modal
        open={nuevoModalOpen}
        title="Registrar Nuevo Mobiliario"
        onClose={() => setNuevoModalOpen(false)}
      >
        <FormNuevo 
          onGuardar={async (payload) => {
            const ok = await guardarMobiliario(payload);
            if (ok) setNuevoModalOpen(false);
            return ok;
          }} 
          loading={guardando} 
        />
      </Modal>

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
