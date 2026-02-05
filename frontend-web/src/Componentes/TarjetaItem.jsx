import './TarjetaItem.css';

function TarjetaItem({ item, onEdit }) {
  return (
    <div className="tarjeta">
      <div className="tarjeta__header">
        <h3 className="tarjeta__title">{item.titulo}</h3>
        <span className={`tarjeta__estado tarjeta__estado--${item.estado.toLowerCase().replace(' ', '-')}`}>
          {item.estado}
        </span>
      </div>
      <p className="tarjeta__codigo">{item.codigo}</p>
      <p className="tarjeta__desc">{item.descripcion}</p>
      <button className="tarjeta__edit" onClick={() => onEdit(item)}>Editar</button>
    </div>
  );
}
export default TarjetaItem;