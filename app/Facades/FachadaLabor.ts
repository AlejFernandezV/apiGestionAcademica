import type { HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import LabControlador from 'App/Controllers/Http/LaboresController'
import Labor  from 'App/Models/Labor/LaborModel'
import TipoLabor from 'App/Models/TipoLabor/TipoLaborModel'
import Api from 'App/Helpers/ResponseApi'

export default class FachadaLabor{
  public async listarLabores({response}: HttpContextContract){
    const labControlador = new LabControlador()
    const api = new Api()

    const results = await labControlador.indexAll()

    if(results.length <= 0){
      api.setState(404,"Error","No hay labores para listar")
    }else{
      api.setResult(results)
    }

    return response.json(api.toResponse())
  }

  public async listarTiposLabores({response}: HttpContextContract){
    const labControlador = new LabControlador()
    const api = new Api()

    const results = await labControlador.indexAllNamesTL()

    if(results.length <= 0){
      api.setState(404,"Error","No hay tipos labores para listar")
    }else{
      api.setResult(results)
    }

    return response.json(api.toResponse())
  }

  public async buscarPorNombreLabor({request,response}: HttpContextContract){
    const labControlador = new LabControlador()
    const api = new Api()
    const nombreLabor = request.input("nombre")

    const result = await labControlador.findByName(nombreLabor)

    if(result === null){
      api.setState(404,"Error","No se pudo encontrar la labor")
    }else{
      api.setResult(result)
    }
    return response.json(api.toResponse())
  }

  public async crearLabor({request,response}: HttpContextContract){
    const labControlador = new LabControlador()
    const api = new Api()
    const labor = new Labor()
    const data = request.only(['lab_nombre', 'lab_horas','tl_id'])

    labor.lab_nombre = data.lab_nombre
    labor.lab_horas = data.lab_horas
    labor.tl_id = (await TipoLabor.findByOrFail("tl_id", data.tl_id)).tl_id

    const result = await labControlador.store(labor)

    if(result === null){
      api.setState(404,"Error","No se pudo crear la labor")
    }else{
      api.setResult(result)
    }
    return response.json(api.toResponse())
  }

  public async actualizarLabor({request,response}: HttpContextContract){
    const labControlador = new LabControlador()
    const api = new Api()
    const data = request.only(['lab_id','lab_nombre', 'lab_horas','tl_descripcion'])

    const result = await labControlador.update(data)

    if(result === null){
      api.setState(404,"Error","Error al actualizar labor")
    }else{
      api.setResult(result)
    }
    return response.json(api.toResponse())
  }

  public async eliminarLabor({request,response}: HttpContextContract){
    const labControlador = new LabControlador()
    const api = new Api()
    const nombreLabor = request.input("nombre")

    const result = await labControlador.destroy(nombreLabor)

    if(result === null){
      api.setState(404,"Error","No se pudo eliminar la labor")
    }else{
      api.setResult(result)
    }
    return response.json(api.toResponse())
  }

}
