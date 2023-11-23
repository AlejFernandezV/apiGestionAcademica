import type { HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import UsuControlador from 'App/Controllers/Http/UsuariosController'
import Usuario  from 'App/Models/Usuario/UsuarioModel'
import UsuarioRol from 'App/Models/UsuarioRol/UsuarioRolModel'
import Api from 'App/Helpers/ResponseApi'

export default class FachadaUsuario{

  public async listarUsuarios({}: HttpContextContract){
    const controladorUsuario = new UsuControlador()
    const api = new Api()

    const results = await controladorUsuario.showAll()

    if(results.length <= 0){
      api.setState(404,"Error","No hay usuarios para listar")
    }

    api.setResult(results)
    return api.toResponse()
  }

  public async listarNombresUsuarios({}: HttpContextContract){
    const controladorUsuario = new UsuControlador()
    const api = new Api()

    const results = await controladorUsuario.showAllNames()

    if(results.length <= 0){
      api.setState(404,"Error","No hay usuarios para listar")
    }

    api.setResult(results)
    return api.toResponse()
  }

  public async crearUsuario({request,response}: HttpContextContract){
    const api = new Api()
    const controladorUsuario = new UsuControlador()
    const data = request.only(['usu_id','usu_tipo_id','usu_email', 'usu_password'
    , 'usu_nombre', 'usu_apellido', 'usu_genero'
    , 'usu_estudio','rol_id','usu_estado'])

    const usuario = new Usuario()
    usuario.usu_id = data.usu_id
    usuario.usu_tipo_id = data.usu_tipo_id
    usuario.usu_email = data.usu_email
    usuario.usu_password = data.usu_password
    usuario.usu_nombre = data.usu_nombre
    usuario.usu_apellido = data.usu_apellido
    usuario.usu_genero = data.usu_genero
    usuario.usu_estudio = data.usu_estudio
    usuario.usu_estado = data.usu_estado


    const usuario_rol = new UsuarioRol()
    usuario_rol.rol_id = data.rol_id

    const result = await controladorUsuario.store(usuario,usuario_rol)

    if(result){
      api.setResult("Usuario creado con éxito")
    }
    else{
      api.setState(404, "Error", "No se pudo crear al usuario")
    }
    return response.json(api.toResponse())
  }

  public async buscarPorNombre({request,response}: HttpContextContract){
    const api = new Api()
    const controladorUsuario = new UsuControlador()
    const params = request.qs()

    if (Object.keys(params).length === 0) {
      api.setState(400, 'Error', 'Se requiere al menos un parámetro de búsqueda');
      return response.json(api.toResponse());
    }

    const result = await controladorUsuario.findByName(params)

    if(result==null){
      api.setState(404,"Error","El usuario no existe")
    }
    api.setResult(result)
    return response.json(api.toResponse())
  }

  public async actualizarUsuario({request,response}: HttpContextContract){
    const api = new Api()
    const controladorUsuario = new UsuControlador()
    const data = request.only(['usu_id', 'usu_email', 'usu_password', 'usu_remember_token'
    , 'usu_nombre', 'usu_apellido', 'usu_genero', 'usu_estudio'])

    const result = await controladorUsuario.update(data)

    if(result.code == 404){
      api.setState(result.code,"Error","No se pudo actualizar el usuario")
      return response.json(api.toResponse())
    }
    api.setState(result.code,"Success","Usuario actualizado con éxito")
    api.setResult(result.result)
    return response.json(api.toResponse())
  }

  public async eliminarPorNombre({request,response}: HttpContextContract){
    const api = new Api()
    const controladorUsuario = new UsuControlador()
    const params = request.qs()

    if (Object.keys(params).length === 0) {
      api.setState(400, 'Error', 'Se requiere al menos un parámetro de búsqueda');
      return response.json(api.toResponse());
    }

    const result = await controladorUsuario.destroy(params)

    if(result.code == 404){
      api.setState(result.code,"Error","No se pudo actualizar el usuario")
      return response.json(api.toResponse())
    }
    api.setState(result.code,"Success","Usuario eliminado con éxito")
    api.setResult(result.result)
    return response.json(api.toResponse())
  }
}
