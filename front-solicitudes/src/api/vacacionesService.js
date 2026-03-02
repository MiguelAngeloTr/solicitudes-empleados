import axios from 'axios'

const API_URL = "http://127.0.0.1:8000"

export const enviarSolicitudVacaciones = async (datos) => {
    const payload = [{
        "Nombre completo del empleado": datos.nombre,
        "Correo electrónico ": datos.correo,
        "Fecha Inicio ": datos.fechaInicio,
        "Fecha de retorno ": datos.fechaRetorno,
        "Comentarios": datos.comentarios
    }]

    const response = await axios.post(`${API_URL}/solicitud-vacaciones`, payload)
    return response.data
}