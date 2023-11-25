import Route from '@ioc:Adonis/Core/Route'
import FachadaUsuario from 'App/Facades/FachadaUsuario'

const fachadaUsuario = new FachadaUsuario()

//Peticiones GET
Route.get('/usuarios/listar_pd', fachadaUsuario.listarUsuariosParaDecano)
Route.get('/usuarios/listar_nombres_pd', fachadaUsuario.listarNombresUsuariosParaDecano)

Route.get('/usuarios/listar_pc', fachadaUsuario.listarUsuariosParaCoordinador)
Route.get('/usuarios/listar_nombres_pc', fachadaUsuario.listarNombresUsuariosParaCoordinador)

Route.get('/usuarios/buscar_por_nombre', fachadaUsuario.buscarPorNombre)
Route.get('/usuarios/buscar_por_num_doc', fachadaUsuario.buscarPorNumDoc)

//Peticiones POST
Route.post('/usuarios/crear', fachadaUsuario.crearUsuario)

//Petiicones PUT
Route.put('/usuarios/actualizar', fachadaUsuario.actualizarUsuario)

//Peticiones DELETE
Route.delete('/usuarios/eliminar', fachadaUsuario.eliminarPorNumDoc)
