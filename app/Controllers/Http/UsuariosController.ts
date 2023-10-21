import type { HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario/UsuarioModel'

export default class UsuariosController {

  public async index({}: HttpContextContract) {
    return await Usuario.query().from('usuario').select('*').orderBy('usu_id')
  }

  public async create({}: HttpContextContract) {}

  public async store({request}: HttpContextContract) {

    const cuerpo = request.only(['usu_email', 'usu_password'
    , 'usu_nombre', 'usu_apellido', 'usu_genero'
    , 'usu_estudio'])

    const usuario = await Usuario.create({
      usu_email: cuerpo.usu_email,
      usu_password: cuerpo.usu_password,
      usu_nombre: cuerpo.usu_nombre,
      usu_apellido: cuerpo.usu_apellido,
      usu_genero: cuerpo.usu_genero,
      usu_estudio: cuerpo.usu_estudio,
    })
    return usuario
  }

  public async show({request}: HttpContextContract) {
    const usuarioId = request.param('id')
    const usuario = await Usuario.findOrFail(usuarioId)
    return usuario
  }

  public async edit({}: HttpContextContract) {}

  public async update({request}: HttpContextContract) {
    const cuerpo = request.only(['usu_id', 'usu_email', 'usu_password'
    , 'usu_nombre', 'usu_apellido', 'usu_genero'
    , 'usu_estudio', 'createdAt', 'updatedAt'])
    const usuarioId = request.param('id')
    const usuario = await Usuario.findOrFail(usuarioId)
    await usuario.merge(cuerpo).save()
    return usuario
  }

  public async destroy({request}: HttpContextContract) {
    const usuarioId = request.param('id')
    const usuario = await Usuario.findOrFail(usuarioId)
    await usuario.delete()
    return true
  }
}
