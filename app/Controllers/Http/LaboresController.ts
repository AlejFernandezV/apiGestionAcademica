import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Api from 'App/Helpers/ResponseApi'
import Labor from 'App/Models/Labor/LaborModel'
export default class LaboresController {
  public async index({}: HttpContextContract) {
    return await Labor.query().select('*').orderBy('lab_id')
  }

  public async create({}: HttpContextContract) {}

  public async store({request,response}: HttpContextContract) {
    const api = new Api()
    const cuerpo = request.only(['lab_nombre', 'lab_horas'
      ,'tl_id','createdAt','updatedAt'])

    try{
      const results = await Labor.create({
        lab_nombre: cuerpo.lab_nombre,
        lab_horas: cuerpo.lab_horas,
        tl_id: cuerpo.tl_id,
        createdAt: cuerpo.createdAt,
        updatedAt: cuerpo.updatedAt,
      })

      api.setResult(results)
    }catch(error){
      api.setState("404","Error",error)
    }finally{
      return response.json(api.toResponse())
    }
  }

  public async show({request,response}: HttpContextContract) {
    const api = new Api()
    try{
      const laborId =  request.param('id')
      const results = await Labor.findOrFail(laborId)
      api.setResult(results)
    }catch(error){
      api.setState("404","Error",error)
    }finally{
      return response.json(api.toResponse())
    }
  }

  public async update({request,response}: HttpContextContract) {
    const api = new Api()
    const cuerpo = request.only(['lab_id','lab_nombre', 'lab_horas'
     ,'tl_id','createdAt','updatedAt'])
    try{
      const labor = await Labor.findOrFail(cuerpo.lab_id)
      const results = labor.merge(cuerpo).save()
      api.setResult(results)
    }catch(error){
      api.setState("404","Error",error)
    }finally{
      return response.json(api.toResponse())
    }
  }

  public async destroy({request,response}: HttpContextContract) {
    const api = new Api()
    const laborId =  request.param('id')
    try{
      const labor = await Labor.findOrFail(laborId)
      const results = await labor.delete()
      api.setResult(results)
    }catch(error){
      api.setState("404","Error",error)
    }finally{
      return response.json(api.toResponse())
    }
  }
}
