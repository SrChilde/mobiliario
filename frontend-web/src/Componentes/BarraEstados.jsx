import './BarraEstados.css';

function BarraEstados({ type = 'info', text = '', onClose }) {
  if (!text) return null;

  const className = `barra-estados barra-estados--${type}`;

  return (
    <div className={className}>
      <strong className="barra-estados__type">{type.toUpperCase()}:</strong>
      <span className="barra-estados__text">{text}</span>
      <button className="barra-estados__close" onClick={onClose}>✕</button>
    </div>
  );
}

export default BarraEstados;