import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Labor from 'App/Models/Labor/LaborModel'
export default class LaboresController {
  public async index({}: HttpContextContract) {
    return await Labor.all()
  }

  public async create({}: HttpContextContract) {}

  public async store({request}: HttpContextContract) {
    const cuerpo = request.only(['lab_nombre', 'lab_horas'
      ,'tipo_labores','createdAt','updatedAt'])
    const labor = await Labor.create({
      lab_nombre: cuerpo.lab_nombre,
      lab_horas: cuerpo.lab_horas,
      //tipo_labores: cuerpo.tipo_labores,
      createdAt: cuerpo.createdAt,
      updatedAt: cuerpo.updatedAt,
    })
    return labor
  }

  public async show({request}: HttpContextContract) {
    const laborId =  request.param('id')
    return await Labor.findOrFail(laborId)
  }

  public async edit({}: HttpContextContract) {}

  public async update({request}: HttpContextContract) {
    const cuerpo = request.only(['lab_id','lab_nombre', 'lab_horas'
     ,'tipo_labores','createdAt','updatedAt'])
    const laborId =  request.param('id')
    const labor = await laborId.findOrFail(laborId)
    return labor.merge(cuerpo).save()
  }

  public async destroy({request}: HttpContextContract) {
    const laborId =  request.param('id')
    const labor = await Labor.findOrFail(laborId)
    await labor.delete()
    return true
  }
}
