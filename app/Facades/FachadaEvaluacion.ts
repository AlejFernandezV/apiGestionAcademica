import type { HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import EvaControlador from 'App/Controllers/Http/EvaluacionesController'
import Evaluacion  from 'App/Models/Evaluacion/EvaluacionModel'
import Labor from 'App/Models/Labor/LaborModel'
import Periodo from 'App/Models/Periodo/PeriodoModel'
import UsuarioRol from 'App/Models/UsuarioRol/UsuarioRolModel'
import Api from 'App/Helpers/ResponseApi'
import Mail from '@ioc:Adonis/Addons/Mail'
import Usuario from 'App/Models/Usuario/UsuarioModel'

export default class FachadaEvaluacion{
  public async listarEvaluaciones({response}: HttpContextContract){
    const api = new Api()
    const evaControlador = new EvaControlador()

    const results = await evaControlador.indexAll()

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
    const num_doc = request.input("num_doc")

    const results = await evaControlador.indexByDocente(num_doc)

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
    const periodoNombre = request.input("per_nombre")

    const results = await evaControlador.indexByPeriodo(periodoNombre)

    if(results.length <= 0){
      api.setState(404,"Error","No hay evaluaciones en este periodo para listar")
    }else{
      api.setResult(results)
    }
    return response.json(api.toResponse())
  }

  public async listarEvaluacionesPorNumDocYPeriodo({request, response}: HttpContextContract){
    const api = new Api()
    const evaControlador = new EvaControlador()
    const periodoNombre = request.input("per_nombre")
    const usuarioNumDoc = request.input("num_doc")

    const results = await evaControlador.indexByNumDocPeriodo(usuarioNumDoc,periodoNombre)

    if(results.length <= 0){
      api.setState(404,"Error","No hay evaluaciones en este periodo para listar")
    }else{
      api.setResult(results)
    }
    return response.json(api.toResponse())
  }

  public async listarEvaluacionesActivas({response}: HttpContextContract){
    const api = new Api()
    const evaControlador = new EvaControlador()

    const results = await evaControlador.indexAllActive()

    if(results.length <= 0){
      api.setState(404,"Error","No hay evaluaciones de este profesor para listar")
    }else{
      api.setResult(results)
    }
    return response.json(api.toResponse())
  }

  public async listarEvaluacionesInactivas({response}: HttpContextContract){
    const api = new Api()
    const evaControlador = new EvaControlador()

    const results = await evaControlador.indexAllInactive()

    if(results.length <= 0){
      api.setState(404,"Error","No hay evaluaciones de este profesor para listar")
    }else{
      api.setResult(results)
    }
    return response.json(api.toResponse())
  }

  public async listarEvaluacionesTerminadas({response}: HttpContextContract){
    const api = new Api()
    const evaControlador = new EvaControlador()

    const results = await evaControlador.indexAllFinished()

    if(results.length <= 0){
      api.setState(404,"Error","No hay evaluaciones de este profesor para listar")
    }else{
      api.setResult(results)
    }
    return response.json(api.toResponse())
  }

  public async listarEvaluacionesActivasDocente({request, response}: HttpContextContract){
    const api = new Api()
    const evaControlador = new EvaControlador()
    const num_doc = request.input("num_doc")

    const results = await evaControlador.indexAllActiveByDocente(num_doc)

    if(results.length <= 0){
      api.setState(404,"Error","No hay evaluaciones de este profesor para listar")
    }else{
      api.setResult(results)
    }
    return response.json(api.toResponse())
  }

  public async listarEvaluacionesInactivasDocente({request, response}: HttpContextContract){
    const api = new Api()
    const evaControlador = new EvaControlador()
    const num_doc = request.input("num_doc")

    const results = await evaControlador.indexAllInactiveByDocente(num_doc)

    if(results.length <= 0){
      api.setState(404,"Error","No hay evaluaciones de este profesor para listar")
    }else{
      api.setResult(results)
    }
    return response.json(api.toResponse())
  }

  public async crearEvaluacion({request, response}: HttpContextContract){
    const api = new Api()
    const data = request.only(['eva_estado', 'eva_puntaje',
    'eva_resultado', 'lab_id', 'per_id', 'usu_id'])

    const evaControlador = new EvaControlador()
    const evaluacion = new Evaluacion()

    if(data.eva_estado === null || data.eva_estado === undefined){
      api.setState(404,"Error","No se pudo crear la evaluacion, el estado no puede ser nulo")
      return response.json(api.toResponse())
    }
    if(data.eva_puntaje === null || data.eva_puntaje === undefined){
      api.setState(404,"Error","No se pudo crear la evaluacion, el puntaje no puede ser nulo")
      return response.json(api.toResponse())
    }
    if(data.eva_resultado === null || data.eva_resultado === undefined){
      api.setState(404,"Error","No se pudo crear la evaluacion, el resultado no puede ser nulo")
      return response.json(api.toResponse())
    }

    try{
      const labor = await Labor.findByOrFail('lab_id',data.lab_id)
      const periodo = await Periodo.findByOrFail('per_id',data.per_id)
      const usuario_rol = await UsuarioRol.findByOrFail('usu_id',data.usu_id)
      const usuario = await Usuario.findByOrFail('usu_id',data.usu_id)

      evaluacion.eva_estado = data.eva_estado
      evaluacion.eva_puntaje = data.eva_puntaje
      evaluacion.eva_resultado = data.eva_resultado
      evaluacion.lab_id = labor.lab_id
      evaluacion.per_id = periodo.per_id
      evaluacion.usu_id = usuario_rol.usu_id

      const results = await evaControlador.store(evaluacion)

      if(results == null){
        api.setState(404,"Error","No se pudo crear la evaluacion")
      }else{
        api.setResult(results)
      }

      const messageContent = `Por favor, no responder este correo.\n
      Este correo solamente es para notificarle que se le ha asignado
      una nueva autoevaluacion para ${labor.lab_nombre}.\n
      Por favor, dilgenciarla antes del  cierre del semestre.\n
      Universitariamente Gestión Académica Unicauca`


      await Mail.send(message => {
        message
          .from('coordinator@unicauca.edu.co')
          .to(usuario.usu_email, `${usuario.usu_nombre} ${usuario.usu_apellido}`)
          .subject(`Autoevaluación asignada para ${labor.lab_nombre}`)
          .html(messageContent)
      })

    }catch(error){
      console.log(error)
    }finally{
      return response.json(api.toResponse())
    }
  }

  public async actualizarResultado({request, response}: HttpContextContract){
    const api = new Api()
    const data = request.only(['eva_id','eva_resultado','eva_puntaje'])
    const evaControlador = new EvaControlador()

    const result = await evaControlador.updateResult(data)

    if(result===null){
      api.setState(404,"Error", "No se pudo actualizar el resultado de la evaluacion")
    }else{
      api.setResult(result)
    }
    return response.json(api.toResponse())
  }

  public async actualizarEstado({request, response}: HttpContextContract){
    const api = new Api()
    const data = request.only(['eva_id','eva_estado'])
    const evaControlador = new EvaControlador()

    const result = await evaControlador.updateState(data)

    if(result===null){
      api.setState(404,"Error", "No se pudo actualizar el resultado de la evaluacion")
    }else{
      api.setResult(result)
    }
    return response.json(api.toResponse())
  }

  public async eliminarEvaluacion({request, response}: HttpContextContract){
    const api = new Api()
    const eva_id = request.input('eva_id')
    const evaControlador = new EvaControlador()

    const result = await evaControlador.destroy(eva_id)

    if(result===false){
      api.setState(404,"Error", "No se pudo actualizar el resultado de la evaluacion")
    }else{
      api.setResult("Evaluacion eliminada con éxito")
    }
    return response.json(api.toResponse())
  }
}
