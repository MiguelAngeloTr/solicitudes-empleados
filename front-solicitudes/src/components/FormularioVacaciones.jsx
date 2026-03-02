import { useForm } from 'react-hook-form'
import { enviarSolicitudVacaciones } from '../api/vacacionesService'
import { useState } from 'react'

function FormularioVacaciones() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
    const [status, setStatus] = useState({ type: '', message: '' })

    const onSubmit = async (datos) => {
        setStatus({ type: '', message: '' })
        try {
            const respuesta = await enviarSolicitudVacaciones(datos)
            setStatus({ type: 'success', message: `✅ ¡Solicitud enviada! Confirmación para ${respuesta.empleado}` })
            reset()
        } catch (error) {
            setStatus({ type: 'error', message: "❌ Error al enviar la solicitud. Intenta de nuevo." })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {status.message && (
                <div style={{
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1.5rem',
                    backgroundColor: status.type === 'success' ? '#e6fffa' : '#fff5f5',
                    color: status.type === 'success' ? '#2c7a7b' : '#c53030',
                    border: `1px solid ${status.type === 'success' ? '#81e6d9' : '#feb2b2'}`,
                    fontWeight: '500'
                }}>
                    {status.message}
                </div>
            )}

            <div className="form-group">
                <label>Nombre Completo</label>
                <input
                    {...register("nombre", { required: "El nombre es obligatorio" })}
                    placeholder="Ej. Juan Pérez"
                    className={errors.nombre ? 'error' : ''}
                />
                {errors.nombre && <p className="error-msg">⚠ {errors.nombre.message}</p>}
            </div>

            <div className="form-group">
                <label>Correo Institucional</label>
                <input
                    {...register("correo", {
                        required: "El correo es obligatorio",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Correo inválido"
                        }
                    })}
                    placeholder="correo@empresa.com"
                    type="email"
                    className={errors.correo ? 'error' : ''}
                />
                {errors.correo && <p className="error-msg">⚠ {errors.correo.message}</p>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                    <label>Fecha de Inicio</label>
                    <input
                        {...register("fechaInicio", { required: "Requerido" })}
                        type="date"
                        className={errors.fechaInicio ? 'error' : ''}
                    />
                    {errors.fechaInicio && <p className="error-msg">⚠ {errors.fechaInicio.message}</p>}
                </div>

                <div className="form-group">
                    <label>Fecha de Retorno</label>
                    <input
                        {...register("fechaRetorno", { required: "Requerido" })}
                        type="date"
                        className={errors.fechaRetorno ? 'error' : ''}
                    />
                    {errors.fechaRetorno && <p className="error-msg">⚠ {errors.fechaRetorno.message}</p>}
                </div>
            </div>

            <div className="form-group">
                <label>Comentarios Adicionales</label>
                <textarea
                    {...register("comentarios")}
                    placeholder="Cualquier detalle adicional que debamos saber..."
                    rows="3"
                />
            </div>

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
            </button>
        </form>
    )
}

export default FormularioVacaciones

