import Route from '@ioc:Adonis/Core/Route'
import FachadaPeriodo from 'App/Facades/FachadaPeriodo'

const fachadaPer = new FachadaPeriodo()

//Peticiones GET
Route.get('/periodos/listar', fachadaPer.listarPeriodos)
Route.get('/periodos/listar_nombres', fachadaPer.listarNombresPeriodos)
Route.get('/periodos/buscar_por_nombre', fachadaPer.buscarPeriodoPorNombre)

//Peticiones POST
Route.post('/periodos/crear', fachadaPer.crearPeriodo)

//Peticiones PUT
Route.put('/periodos/actualizar', fachadaPer.actualizarPeriodo)

//Peticiones DELETE
Route.delete('/periodos/eliminar', fachadaPer.eliminarPeriodoPorNombre)
