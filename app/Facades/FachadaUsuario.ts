import type { HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import UsuControlador from 'App/Controllers/Http/UsuariosController'
import Usuario  from 'App/Models/Usuario/UsuarioModel'
import UsuarioRol from 'App/Models/UsuarioRol/UsuarioRolModel'
import Api from 'App/Helpers/ResponseApi'

export default class FachadaUsuario{

  public async listarUsuariosParaDecano({}: HttpContextContract){
    const controladorUsuario = new UsuControlador()
    const api = new Api()

    const results = await controladorUsuario.showAllForDean()

    if(results.length <= 0){
      api.setState(404,"Error","No hay usuarios para listar")
    }

    api.setResult(results)
    return api.toResponse()
  }

  public async listarNombresUsuariosParaDecano({}: HttpContextContract){
    const controladorUsuario = new UsuControlador()
    const api = new Api()

    const results = await controladorUsuario.showAllNamesForDean()

    if(results.length <= 0){
      api.setState(404,"Error","No hay usuarios para listar")
    }

    api.setResult(results)
    return api.toResponse()
  }

  public async listarUsuariosParaCoordinador({}: HttpContextContract){
    const controladorUsuario = new UsuControlador()
    const api = new Api()

    const results = await controladorUsuario.showAllForCoordinator()

    if(results.length <= 0){
      api.setState(404,"Error","No hay usuarios para listar")
    }

    api.setResult(results)
    return api.toResponse()
  }

  public async listarNombresUsuariosParaCoordinador({}: HttpContextContract){
    const controladorUsuario = new UsuControlador()
    const api = new Api()

    const results = await controladorUsuario.showAllNamesForCoordinator()

    if(results.length <= 0){
      api.setState(404,"Error","No hay usuarios para listar")
    }

    api.setResult(results)
    return api.toResponse()
  }

  public async crearUsuario({request,response}: HttpContextContract){
    const api = new Api()
    const controladorUsuario = new UsuControlador()
    const data = request.only(['usu_num_doc','usu_tipo_doc','usu_email', 'usu_password'
    , 'usu_nombre', 'usu_apellido', 'usu_genero'
    , 'usu_estudio','rol_id','usu_estado'])

    const usuario = new Usuario()
    usuario.usu_num_doc = data.usu_num_doc
    usuario.usu_tipo_doc = data.usu_tipo_doc
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

  public async buscarPorNumDoc({request,response}: HttpContextContract){
    const api = new Api()
    const controladorUsuario = new UsuControlador()
    const params = request.input("num_doc")

    if (Object.keys(params).length === 0) {
      api.setState(400, 'Error', 'Se requiere al menos un parámetro de búsqueda');
      return response.json(api.toResponse());
    }

    const result = await controladorUsuario.findByNumDoc(params)

    if(result==null){
      api.setState(404,"Error","El usuario no existe")
    }
    api.setResult(result)
    return response.json(api.toResponse())
  }

  public async actualizarUsuario({request,response}: HttpContextContract){
    const api = new Api()
    const controladorUsuario = new UsuControlador()
    const data = request.only(['usu_num_doc_old','usu_num_doc_new','usu_tipo_doc','usu_email','rol_id'
    , 'usu_nombre', 'usu_apellido', 'usu_genero', 'usu_estudio','usu_estado'])

    const newData = {
      usu_num_doc: data.usu_num_doc_new,
      usu_tipo_doc: data.usu_tipo_doc,
      usu_email: data.usu_email,
      usu_nombre: data.usu_nombre,
      usu_apellido: data.usu_apellido,
      usu_genero: data.usu_genero,
      usu_estudio: data.usu_estudio,
      usu_estado: data.usu_estado
    }

    const result = await controladorUsuario.updateByNumDoc(data.usu_num_doc_old,newData,data.rol_id)

    if(result.code == 404){
      api.setState(result.code,"Error","No se pudo actualizar el usuario")
      return response.json(api.toResponse())
    }
    api.setState(result.code,"Success","Usuario actualizado con éxito")
    api.setResult(result.result)
    return response.json(api.toResponse())
  }

  public async eliminarPorNumDoc({request,response}: HttpContextContract){
    const api = new Api()
    const controladorUsuario = new UsuControlador()
    const usu_num_doc = request.input("num_doc")

    const result = await controladorUsuario.destroyByNumDoc(usu_num_doc)

    if(result.code == 404){
      api.setState(result.code,"Error","No se pudo actualizar el usuario")
      return response.json(api.toResponse())
    }
    api.setState(result.code,"Success","Usuario eliminado con éxito")
    api.setResult(result.result)
    return response.json(api.toResponse())
  }
}
