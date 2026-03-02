import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FormularioVacaciones from './components/FormularioVacaciones'
import FormularioAprobacion from './components/FormularioAprobacion'
import logo from './assets/logo.png'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="header">
          <img src={logo} className="logo" alt="Portal Logo" />
          <h1>Portal del Empleado</h1>
          <p className="subtitle">Gestión de Solicitudes y Ausencias</p>
        </header>

        <main className="card">
          <Routes>
            <Route path="/" element={<FormularioVacaciones />} />
            <Route path="/aprobar/:solicitud_id" element={<FormularioAprobacion />} />
          </Routes>
        </main>

        <footer style={{ textAlign: 'center', marginTop: '3rem', color: '#94a3b8', fontSize: '0.8rem' }}>
          © {new Date().getFullYear()} Sistema de Gestión Interna
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App