import Route from '@ioc:Adonis/Core/Route'
import FachadaLabor from 'App/Facades/FachadaLabor'

const fachadaLab = new FachadaLabor()

//Peticiones GET
Route.get('/labores', fachadaLab.listarLabores)
Route.get('/labor', fachadaLab.buscarPorNombreLabor)

//Peticiones POST
Route.post('/labores', fachadaLab.crearLabor)

//Peticiones PUT
Route.put('/labores', fachadaLab.actualizarLabor)

//Peticiones DELETE
Route.delete('/labores', fachadaLab.eliminarLabor)
