import Route from '@ioc:Adonis/Core/Route'
import FachadaUsuario from 'App/Facades/FachadaUsuario'

const fachadaUsuario = new FachadaUsuario()

//Peticiones GET
Route.get('/usuarios', fachadaUsuario.listarUsuarios)
Route.get('/usuarios_nombres', fachadaUsuario.listarNombresUsuarios)
Route.get('/usuarios/buscar_por_nombre', fachadaUsuario.buscarPorNombre)

//Peticiones POST
Route.post('/usuarios', fachadaUsuario.crearUsuario)

//Petiicones PUT
Route.put('/usuario_actualizar', fachadaUsuario.actualizarUsuario)

//Peticiones DELETE
Route.delete('/usuario_eliminar', fachadaUsuario.eliminarPorNombre)
