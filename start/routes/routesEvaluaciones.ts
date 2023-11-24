import Route from '@ioc:Adonis/Core/Route'
import FachadaEvaluacion from 'App/Facades/FachadaEvaluacion'

const fachadaEva = new FachadaEvaluacion()

//Peticiones GET
Route.get('/evaluaciones/listar', fachadaEva.listarEvaluaciones)
Route.get('/evaluaciones/listar_por_docente', fachadaEva.listarEvaluacionesPorDocente)
Route.get('/evaluaciones/listar_por_periodo', fachadaEva.listarEvaluacionesPorPeriodo)
Route.get('/evaluaciones/listar_activas', fachadaEva.listarEvaluacionesActivas)
Route.get('/evaluaciones/listar_inactivas', fachadaEva.listarEvaluacionesInactivas)
Route.get('/evaluaciones/listar_terminadas', fachadaEva.listarEvaluacionesTerminadas)
Route.get('/evaluaciones/listar_activas_docente', fachadaEva.listarEvaluacionesActivasDocente)
Route.get('/evaluaciones/listar_terminadas_docente', fachadaEva.listarEvaluacionesActivasDocente)

//Peticiones POST
Route.post('evaluaciones/crear', fachadaEva.crearEvaluacion)

//Peticiones PUT
Route.put('evaluaciones/realizar', fachadaEva.actualizarResultado)
Route.put('evaluaciones/actualizar_estado', fachadaEva.actualizarEstado)

//Peticiones DELETE
Route.delete('evaluaciones/eliminar', fachadaEva.eliminarEvaluacion)
