import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Periodo from 'App/Models/Periodo/PeriodoModel'
import Api from 'App/Helpers/ResponseApi'

export default class PeriodosController {
  public async index({}: HttpContextContract) {
    return await Periodo.query().from('periodo').select('*').orderBy('per_id')
  }

  public async create({}: HttpContextContract) {}

  public async store({request,response}: HttpContextContract) {
    const api = new Api()
    const data = request.only(['per_id', 'per_nombre', 'per_fecha_inicio'
    , 'per_fecha_fin', 'createdAt', 'updatedAt'])

    try{
      const results = await Periodo.create({
        per_id: data.per_id,
        per_nombre: data.per_nombre,
        per_fecha_inicio: data.per_fecha_inicio,
        per_fecha_fin: data.per_fecha_fin,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      })
      api.setResult(results)
    }catch(error){
      api.setState("404","Error","No se pudo crear el periodo")
    }finally{
      return response.json(api.toResponse)
    }
  }

  public async show({request,response}: HttpContextContract) {
    const api = new Api()
    const periodoId = request.param('id')
    try{
      const results = await Periodo.findOrFail(periodoId)
      api.setResult(results)
    }catch(error){
      console.log(error)
      api.setState("404","Error","No se pudo mostrar el periodo solicitado")
    }finally{
      return response.json(api.toResponse)
    }
  }

  public async update({request,response}: HttpContextContract) {
    const api = new Api()
    const data = request.only(['per_id', 'per_nombre', 'per_fecha_inicio'
    , 'per_fecha_fin'])
    try{
      const periodo = await Periodo.findOrFail(data.per_id)
      const results = await periodo.merge(data).save
      api.setResult(results)
    }catch(error){
      console.log(error)
      api.setState("404","Error","No se pudo actualizar el periodo")
    }finally{
      return response.json(api.toResponse)
    }
  }

  public async destroy({request,response}: HttpContextContract) {
    const api = new Api()
    const periodoId = request.param('id')
    try{
      const periodo = await Periodo.findOrFail(periodoId)
      const results = await periodo.delete()
      api.setResult(results)
    }catch(error){
      console.log(error)
      api.setState("404","Error","No se pudo eliminar el periodo")
    }finally{
      return response.json(api.toResponse)
    }
  }
}
