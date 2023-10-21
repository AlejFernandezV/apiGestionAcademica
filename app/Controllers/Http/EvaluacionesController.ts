import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Evaluacion from 'App/Models/Evaluacion/EvaluacionModel'
export default class EvaluacionesController {
  public async index({}: HttpContextContract) {
    return await Evaluacion.all()
  }

  public async create({}: HttpContextContract) {
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
