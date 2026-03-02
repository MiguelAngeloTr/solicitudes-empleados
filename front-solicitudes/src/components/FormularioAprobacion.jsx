import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const API_URL = "http://127.0.0.1:8000"

function FormularioAprobacion() {
    const { solicitud_id } = useParams()
    const [solicitud, setSolicitud] = useState(null)
    const [resultado, setResultado] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        axios.get(`${API_URL}/solicitud-vacaciones/${solicitud_id}`)
            .then(res => {
                setSolicitud(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, [solicitud_id])

    const responder = async (estado) => {
        try {
            await axios.post(`${API_URL}/solicitud-vacaciones/resultado`, {
                solicitud_id: parseInt(solicitud_id),
                estado
            })
            setResultado(estado)
        } catch (error) {
            console.error(error)
            alert("Error al actualizar el estado")
        }
    }

    if (resultado) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <h2 style={{ color: resultado === "aprobado" ? '#27ae60' : '#e74c3c' }}>
                    Solicitud {resultado === "aprobado" ? "✅ Aprobada" : "❌ Rechazada"}
                </h2>
                <p>El sistema ha sido actualizado correctamente.</p>
                <button onClick={() => window.location.href = '/'} style={{ marginTop: '1rem', width: 'auto', padding: '0.8rem 2rem' }}>
                    Volver al Inicio
                </button>
            </div>
        )
    }

    if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}><p>Cargando detalles de la solicitud...</p></div>
    if (!solicitud || solicitud.error) return <div style={{ textAlign: 'center', padding: '2rem' }}><p>❌ Solicitud no encontrada</p></div>

    return (
        <div>
            <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', borderBottom: '2px solid #f0f4f8', paddingBottom: '0.5rem' }}>
                Detalles de la Solicitud
            </h2>

            <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                <div>
                    <label>Empleado</label>
                    <div style={{ padding: '0.8rem', background: '#f8fafc', borderRadius: '8px', fontWeight: '500' }}>{solicitud.nombre}</div>
                </div>

                <div>
                    <label>Correo Electrónico</label>
                    <div style={{ padding: '0.8rem', background: '#f8fafc', borderRadius: '8px' }}>{solicitud.email}</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label>Fecha Inicio</label>
                        <div style={{ padding: '0.8rem', background: '#f8fafc', borderRadius: '8px' }}>{solicitud.fecha_inicio}</div>
                    </div>
                    <div>
                        <label>Fecha Retorno</label>
                        <div style={{ padding: '0.8rem', background: '#f8fafc', borderRadius: '8px' }}>{solicitud.fecha_retorno}</div>
                    </div>
                </div>

                <div>
                    <label>Comentarios</label>
                    <div style={{ padding: '0.8rem', background: '#f8fafc', borderRadius: '8px', fontStyle: 'italic' }}>
                        {solicitud.comentarios || "Sin comentarios adicionales"}
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <button
                    onClick={() => responder("aprobado")}
                    style={{ background: 'linear-gradient(135deg, #27ae60, #2ecc71)', boxShadow: '0 4px 12px rgba(39, 174, 96, 0.2)' }}
                >
                    ✅ Aprobar
                </button>
                <button
                    onClick={() => responder("rechazado")}
                    style={{ background: 'linear-gradient(135deg, #e74c3c, #c0392b)', boxShadow: '0 4px 12px rgba(231, 76, 60, 0.2)' }}
                >
                    ❌ Rechazar
                </button>
            </div>
        </div>
    )
}

export default FormularioAprobacion