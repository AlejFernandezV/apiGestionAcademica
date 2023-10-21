import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Periodo from 'App/Models/Periodo/PeriodoModel'

export default class PeriodosController {
  public async index({}: HttpContextContract) {
    return await Periodo.query().from('periodo').select('*').orderBy('per_id')
  }

  public async create({}: HttpContextContract) {}

  public async store({request}: HttpContextContract) {
    const cuerpo = request.only(['per_id', 'per_nombre', 'per_fecha_inicio'
    , 'per_fecha_fin', 'createdAt', 'updatedAt'])

    const periodo = await Periodo.create({
      per_id: cuerpo.per_id,
      per_nombre: cuerpo.per_nombre,
      per_fecha_inicio: cuerpo.per_fecha_inicio,
      per_fecha_fin: cuerpo.per_fecha_fin,
      createdAt: cuerpo.createdAt,
      updatedAt: cuerpo.updatedAt,
    })
    return periodo
  }

  public async show({request}: HttpContextContract) {
    const periodoId = request.param('id')
    const periodo = await Periodo.findOrFail(periodoId)
    return periodo
  }

  public async edit({}: HttpContextContract) {}

  public async update({request}: HttpContextContract) {
    const cuerpo = request.only(['per_id', 'per_nombre', 'per_fecha_inicio'
    , 'per_fecha_fin', 'createdAt', 'updatedAt'])
    const periodoId = request.param('id')
    const periodo = await Periodo.findOrFail(periodoId)
    await periodo.merge(cuerpo).save
    return periodo
  }

  public async destroy({request}: HttpContextContract) {
    const periodoId = request.param('id')
    const periodo = await Periodo.findOrFail(periodoId)
    await periodo.delete()
    return true
  }
}
