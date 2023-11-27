import Route from '@ioc:Adonis/Core/Route'
import FachadaLabor from 'App/Facades/FachadaLabor'

const fachadaLab = new FachadaLabor()

//Peticiones GET
Route.get('/labores/listar', fachadaLab.listarLabores)
Route.get('/labores/listar_por_nombre', fachadaLab.buscarPorNombreLabor)
Route.get('/labores/listar_tl_nombres',fachadaLab.listarTiposLabores)

//Peticiones POST
Route.post('/labores/crear', fachadaLab.crearLabor)

//Peticiones PUT
Route.put('/labores/actualizar', fachadaLab.actualizarLabor)

//Peticiones DELETE
Route.delete('/labores/eliminar', fachadaLab.eliminarLabor)
