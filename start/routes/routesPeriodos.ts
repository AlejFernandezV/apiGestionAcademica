import Route from '@ioc:Adonis/Core/Route'
import FachadaPeriodo from 'App/Facades/FachadaPeriodo'

const fachadaPer = new FachadaPeriodo()

//Peticiones GET
Route.get('/periodos', fachadaPer.listarPeriodos)
Route.get('/nombres_periodos', fachadaPer.listarNombresPeriodos)
Route.get('/periodo', fachadaPer.buscarPeriodoPorNombre)

//Peticiones POST
Route.post('/periodos', fachadaPer.crearPeriodo)

//Peticiones PUT
Route.put('/periodos', fachadaPer.actualizarPeriodo)

//Peticiones DELETE
Route.delete('/periodos', fachadaPer.eliminarPeriodoPorNombre)
