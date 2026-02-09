import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./Paginas/Inicio";
import MobiliarioDetalle from "./Paginas/MobiliarioDetalle";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/mobiliario/:id" element={<MobiliarioDetalle />} />
      </Routes>
    </Router>
  );
}

export default App;
