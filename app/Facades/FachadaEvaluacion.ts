import type { HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import EvaControlador from 'App/Controllers/Http/EvaluacionesController'
import Evaluacion  from 'App/Models/Evaluacion/EvaluacionModel'
import Labor from 'App/Models/Labor/LaborModel'
import Periodo from 'App/Models/Periodo/PeriodoModel'
import UsuarioRol from 'App/Models/UsuarioRol/UsuarioRolModel'
import Api from 'App/Helpers/ResponseApi'

export default class FachadaEvaluacion{
  public async listarEvaluaciones({response}: HttpContextContract){
    const api = new Api()
    const evaControlador = new EvaControlador()

    const results = await evaControlador.index()

    if(results.length <= 0){
      api.setState(404,"Error","No hay evaluaciones para listar")
    }else{
      api.setResult(results)
    }
    return response.json(api.toResponse())
  }

  public async listarEvaluacionesPorDocente({request, response}: HttpContextContract){
    const api = new Api()
    const evaControlador = new EvaControlador()
    const idDocente = request.input("id")

    const results = await evaControlador.indexByDocente(idDocente)

    if(results.length <= 0){
      api.setState(404,"Error","No hay evaluaciones de este profesor para listar")
    }else{
      api.setResult(results)
    }
    return response.json(api.toResponse())
  }

  public async listarEvaluacionesPorPeriodo({request, response}: HttpContextContract){
    const api = new Api()
    const evaControlador = new EvaControlador()
    const periodoNombre = request.input("nombre")

    const results = await evaControlador.indexByPeriodo(periodoNombre)

    if(results.length <= 0){
      api.setState(404,"Error","No hay evaluaciones en este periodo para listar")
    }else{
      api.setResult(results)
    }
    return response.json(api.toResponse())
  }

  public async crearEvaluacion({request, response}: HttpContextContract){
    const api = new Api()
    const data = request.only(['eva_estado', 'eva_puntaje', 'eva_resultado', 'lab_id', 'per_id', 'usu_id'])
    const evaControlador = new EvaControlador()
    const evaluacion = new Evaluacion()

    if(data.eva_estado === null){
      api.setState(404,"Error","No se pudo crear la evaluacion, el estado no puede ser nulo")
      return response.json(api.toResponse())
    }
    if(data.eva_puntaje === null){
      api.setState(404,"Error","No se pudo crear la evaluacion, el puntaje no puede ser nulo")
      return response.json(api.toResponse())
    }
    if(data.eva_resultado === null){
      api.setState(404,"Error","No se pudo crear la evaluacion, el resultado no puede ser nulo")
      return response.json(api.toResponse())
    }

    try{
      const labor = await Labor.findByOrFail('lab_id',data.lab_id)
      const periodo = await Periodo.findByOrFail('per_id',data.per_id)
      const usuario = await UsuarioRol.findByOrFail('usu_id',data.usu_id)

      evaluacion.eva_estado = data.eva_estado
      evaluacion.eva_puntaje = data.eva_puntaje
      evaluacion.eva_resultado = data.eva_resultado
      evaluacion.lab_id = labor.lab_id
      evaluacion.per_id = periodo.per_id
      evaluacion.usu_id = usuario.usu_id

      const results = await evaControlador.store(evaluacion)

      if(results == null){
        api.setState(404,"Error","No se pudo crear la evaluacion")
      }else{
        api.setResult(results)
      }

    }catch(error){
      console.log(error)
    }finally{
      return response.json(api.toResponse())
    }
  }

  public async actualizarResultado({request, response}: HttpContextContract){
    const api = new Api()
    const data = request.only(['eva_id','eva_resultado'])
    const evaControlador = new EvaControlador()
    const evaluacion = await Evaluacion.findByOrFail("eva_id",data.eva_id)

    if(evaluacion===null){
      api.setState(404,"Error", "No se pudo actualizar el resultado de la evaluacion")
    }else{
      const results = await evaControlador.updateResult(data)
      api.setResult(results)
    }
    return response.json(api.toResponse())
  }
}
