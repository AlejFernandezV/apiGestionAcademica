import type { HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario/UsuarioModel'
import UsuarioRol from 'App/Models/UsuarioRol/UsuarioRolModel'
import Api from 'App/Helpers/ResponseApi'
export default class UsuariosController {

  public async index({}: HttpContextContract) {
    return await Usuario.query().from('usuario').select('*').orderBy('usu_id')
  }

  public async store({request,response}: HttpContextContract) {
    const api = new Api()
    const data = request.only(['usu_email', 'usu_password'
    , 'usu_nombre', 'usu_apellido', 'usu_genero'
    , 'usu_estudio','rol_id'])

    const usuario = await Usuario.create({
      usu_email: data.usu_email,
      usu_password: data.usu_password,
      usu_nombre: data.usu_nombre,
      usu_apellido: data.usu_apellido,
      usu_genero: data.usu_genero,
      usu_estudio: data.usu_estudio,
    })

    if(usuario!=null){
      const results = UsuarioRol.create({
        usu_id: usuario.usu_id,
        rol_id: data.rol_id
      })

      api.setResult(results)
    }else{
      api.setState(404,"Error","Fallo al crear usuario")
    }
    return response.json(api.toResponse())
  }

  public async show({request,response}: HttpContextContract) {
    const  api = new Api()
    const usuarioId = request.param('id')
    try{
      const results = await Usuario.findOrFail(usuarioId)
      api.setResult(results)
    }catch(error){
      console.log(error)
      api.setState(404,"Error","Fallo al mostrar el usuario")
    }finally{
      return response.json(api.toResponse())
    }
  }

  public async update({request,response}: HttpContextContract) {
    const api = new Api()
    const data = request.only(['usu_id', 'usu_email', 'usu_password'
    , 'usu_nombre', 'usu_apellido', 'usu_genero'
    , 'usu_estudio', 'createdAt', 'updatedAt'])

    try{
      const usuario = await Usuario.findOrFail(data.usu_id)
      const results = await usuario.merge(data).save()
      api.setResult(results)
    }catch(error){
      api.setState("404","Error","No se pudo realizar la actualización del usuario")
    }finally{
      return response.json(api.toResponse)
    }
  }

  public async destroy({request,response}: HttpContextContract) {
    const api = new Api()
    const usuarioId = request.param('id')
    const usuario = await Usuario.findByOrFail('usu_id', usuarioId)

    if(usuario!=null){
      const results = await usuario.delete()

      api.setResult(results)
    }
    else{
      api.setState(404,"Error","No se encontró el usuario")
    }

    return response.json(api.toResponse())
  }
}
