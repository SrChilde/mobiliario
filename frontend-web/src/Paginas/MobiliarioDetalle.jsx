import { useEffect, useState } from "react";
// useState: permite almacenar y actualizar el estado del componente.
// useEffect: permite ejecutar lógica cuando el componente se monta o cuando cambian dependencias.

import { useParams, Link } from "react-router-dom";
// useParams: obtiene parámetros dinámicos desde la URL (/mobiliario/:id).
// Link: permite navegar entre rutas sin recargar la página.

import { getMobiliario } from "../Servicios/api";
// Función que consume la API para obtener el listado de mobiliario.

import Cargando from "../Componentes/Cargando";
// Componente reutilizable para mostrar un indicador de carga.

import BarraEstados from "../Componentes/BarraEstados";
// Componente para mostrar mensajes de estado.

import "./MobiliarioDetalle.css";
// Estilos específicos para este componente.

// Define un componente funcional de React.
function MobiliarioDetalle() {
  // Extrae el valor del parámetro id desde la URL.
  // Ejemplo: /mobiliario/3 → id = "3".
  const { id } = useParams();

  // Guarda el mueble encontrado según el id.
  // Inicialmente es null.
  const [mobiliario, setMobiliario] = useState(null);

  // Controla si los datos están cargando.
  // Se inicia en true para mostrar el componente <Cargando />.
  const [loading, setLoading] = useState(true);

  // Almacena mensajes de error si ocurre un problema al buscar el mueble.
  const [error, setError] = useState("");

  // Este efecto se ejecuta:
  // Cuando el componente se monta o cuando cambia el id
  useEffect(() => {
    // Activa el estado de carga y limpia cualquier error previo
    setLoading(true);
    setError("");

    // Llama a la API para obtener el listado completo de mobiliario.
    getMobiliario()
      // Busca dentro del arreglo el mueble cuyo id coincida con el de la URL.
      // Se usa String() para evitar errores por tipo (number vs string).
      .then((data) => {
        const encontrado = data.find((x) => String(x.id) === String(id));
        if (!encontrado) {
          setError("Mueble no encontrado.");
        } else {
          // Si se encuentra, se guarda en el estado mobiliario.
          setMobiliario(encontrado);
        }
      })
      // Si ocurre un error en la API, se muestra un mensaje.
      .catch(() => setError("Error cargando el mueble."))
      // Desactiva el estado de carga independientemente del resultado.
      .finally(() => setLoading(false));
    // El efecto se vuelve a ejecutar si cambia el id de la URL.
  }, [id]);

  // Mientras los datos están cargando, se muestra el componente de carga.
  if (loading) return <Cargando />;

  // Si existe un error, se muestra el mensaje correspondiente.
  if (error) {
    return (
      <div className="app-container">
        <BarraEstados type="error" text={error} />
        <Link to="/">⬅ Volver al listado</Link>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="detalle-container">
        <h2 className="page-title">Detalle del Mueble</h2>

        <div className="detalle-card">
          <div className="detalle-header">
            <h3>{mobiliario.titulo}</h3>
            <span
              className={`tarjeta__estado tarjeta__estado--${mobiliario.estado
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              {mobiliario.estado}
            </span>
          </div>

          <div className="detalle-body">
            <div className="detalle-field">
              <label>Código:</label>
              <p>{mobiliario.codigo}</p>
            </div>

            <div className="detalle-field">
              <label>Descripción:</label>
              <p>{mobiliario.descripcion}</p>
            </div>

            <div className="detalle-field">
              <label>Ubicación:</label>
              <p>{mobiliario.ubicacion || "No especificada"}</p>
            </div>

            <div className="detalle-field">
              <label>Cantidad:</label>
              <p>{mobiliario.cantidad || "N/A"}</p>
            </div>

            <div className="detalle-field">
              <label>Observaciones:</label>
              <p>{mobiliario.observaciones || "Sin observaciones"}</p>
            </div>
          </div>
        </div>

        <Link to="/" className="btn-volver">
          ⬅ Volver al listado
        </Link>
      </div>
    </div>
  );
}

// Permite importar el componente en App.jsx para usarlo como ruta.
export default MobiliarioDetalle;
