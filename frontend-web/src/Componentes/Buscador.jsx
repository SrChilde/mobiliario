import './Buscador.css';

function Buscador({ value, onChange }) {
  return (
    <div className="buscador-container">
      <input
        type="text"
        placeholder="Buscar mobiliario..."
        value={value}
        onChange={e => onChange(e.target.value)}
        className="buscador__input"
      />
    </div>
  );
}

export default Buscador;