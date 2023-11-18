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
    const cuerpo = request.only(['usu_email', 'usu_password'
    , 'usu_nombre', 'usu_apellido', 'usu_genero'
    , 'usu_estudio','rol_id'])

    const usuario = await Usuario.create({
      usu_email: cuerpo.usu_email,
      usu_password: cuerpo.usu_password,
      usu_nombre: cuerpo.usu_nombre,
      usu_apellido: cuerpo.usu_apellido,
      usu_genero: cuerpo.usu_genero,
      usu_estudio: cuerpo.usu_estudio,
    })

    if(usuario!=null){
      const results = UsuarioRol.create({
        usu_id: usuario.usu_id,
        rol_id: cuerpo.rol_id
      })

      api.setResult(results)
    }else{
      api.setState(404,"Error","Fallo al crear usuario")
    }
    return response.json(api.toResponse())
  }

  public async show({request}: HttpContextContract) {
    const usuarioId = request.param('id')
    const usuario = await Usuario.findOrFail(usuarioId)
    return usuario
  }

  public async update({request}: HttpContextContract) {
    const cuerpo = request.only(['usu_id', 'usu_email', 'usu_password'
    , 'usu_nombre', 'usu_apellido', 'usu_genero'
    , 'usu_estudio', 'createdAt', 'updatedAt'])
    const usuarioId = request.param('id')
    const usuario = await Usuario.findOrFail(usuarioId)
    await usuario.merge(cuerpo).save()
    return usuario
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
