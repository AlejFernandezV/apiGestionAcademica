import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Periodo from 'App/Models/Periodo'

export default class PeriodosController {
  public async index({}: HttpContextContract) {
    const periodo = await Periodo.all()
    return periodo
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
