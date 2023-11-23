import type { HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import PerControlador from 'App/Controllers/Http/PeriodosController'
import Periodo  from 'App/Models/Periodo/PeriodoModel'
import Api from 'App/Helpers/ResponseApi'

export default class FachadaPeriodo{

  public async listarPeriodos({response}: HttpContextContract){
    const api = new Api()
    const perControlador = new PerControlador()

    const results = await perControlador.showAll()

    if(results.length <= 0){
      api.setState(404,"Error","No hay periodos para listar")
    }else{
      api.setResult(results)
    }
    return response.json(api.toResponse())
  }

  public async listarNombresPeriodos({response}: HttpContextContract){
    const api = new Api()
    const perControlador = new PerControlador()

    const results = await perControlador.showAllNames()

    if(results.length <= 0){
      api.setState(404,"Error","No hay periodos para listar")
    }else{
      api.setResult(results)
    }
    return response.json(api.toResponse())
  }

  public async buscarPeriodoPorNombre({request,response}: HttpContextContract){
    const api = new Api()
    const perControlador = new PerControlador()
    const nombre = request.input("nombre")

    const result = await perControlador.findByName(nombre)

    if(result === null){
      api.setState(404,"Error","No se pudo encontrar el periodo académico")
    }else{
      api.setResult(result)
    }
    return response.json(api.toResponse())
  }

  public async crearPeriodo({request,response}: HttpContextContract){
    const api = new Api()
    const perControlador = new PerControlador()
    const data = request.only(['per_nombre','per_anio','per_semestre', 'per_fecha_inicio', 'per_fecha_fin'])
    const periodo = new Periodo()

    periodo.per_nombre = data.per_nombre
    periodo.per_anio = data.per_anio
    periodo.per_semestre = data.per_semestre
    periodo.per_fecha_inicio = data.per_fecha_inicio
    periodo.per_fecha_fin = data.per_fecha_fin

    const result = await perControlador.store(periodo)

    if(result === 404){
      api.setState(404,"Error","No se pudo crear el periodo académico")
    }else{
      api.setResult(result)
    }
    return response.json(api.toResponse())
  }

  public async actualizarPeriodo({request,response}: HttpContextContract){
    const api = new Api()
    const perControlador = new PerControlador()
    const data = request.only(['per_id','per_nombre', 'per_fecha_inicio', 'per_fecha_fin'])

    const result = await perControlador.update(data)

    if(result === 404){
      api.setState(404,"Error","No se pudo actualizar el periodo académico")
    }else{
      api.setResult(result)
    }
    return response.json(api.toResponse())
  }

  public async eliminarPeriodoPorNombre({request,response}: HttpContextContract){
    const api = new Api()
    const perControlador = new PerControlador()
    const data = request.only(['per_nombre'])

    const result = await perControlador.destroy(data.per_nombre)

    if(result === 404){
      api.setState(404,"Error","No se pudo eliminar el periodo académico")
    }else{
      api.setResult(result)
    }
    return response.json(api.toResponse())
  }
}
