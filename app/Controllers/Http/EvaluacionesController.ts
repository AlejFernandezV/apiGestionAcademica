import { Application } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Api from 'App/Helpers/ResponseApi'
import Evaluacion from 'App/Models/Evaluacion/EvaluacionModel'
import Labor from 'App/Models/Labor/LaborModel'
import Periodo from 'App/Models/Periodo/PeriodoModel'
import UsuarioRol from 'App/Models/UsuarioRol/UsuarioRolModel'


export default class EvaluacionesController {

  public async index({}: HttpContextContract) {
    return await Evaluacion.all()
  }

  public async indexByDocente({request, response}: HttpContextContract) {
    const {idDocente} = request.all()

    const api = new Api()

    const results = await Database
    .from('evaluacion')
    .join('usuario_rol','evaluacion.usu_id','usuario_rol.usu_id')
    .join('periodo','evaluacion.per_id','periodo.per_id')
    .join('labor', 'evaluacion.lab_id','labor.lab_id')
    .join('tipo_labor','labor.tl_id','tipo_labor.tl_id')
    .select(
      'labor.lab_nombre',
      'tipo_labor.tl_descripcion',
      'labor.lab_horas',
      //CONSULTA PENDIENTE PARA LA DESCRIPCIÓN
      'periodo.per_fecha_inicio',
      'periodo.per_fecha_fin',
      'evaluacion.eva_estado',
      'evaluacion.eva_resultado',
      'evaluacion.eva_puntaje'
    )
    .where('usuario_rol.usu_id','=',idDocente)

    if(results.length > 0){
      api.setResult(results)
    }
    else{
      api.setState(404,"Error", "No hubo resultados para ese docente")
    }

    return response.json(api.toResponse())
  }

  public async indexByPeriodo({request, response}: HttpContextContract) {
    const {nombrePeriodo} = request.all()

    const api = new Api()

    const results = await Database
    .from('evaluacion')
    .join('usuario_rol','evaluacion.usu_id','usuario_rol.usu_id')
    .join('periodo','evaluacion.per_id','periodo.per_id')
    .join('labor', 'evaluacion.lab_id','labor.lab_id')
    .join('tipo_labor','labor.tl_id','tipo_labor.tl_id')
    .select(
      'labor.lab_nombre',
      'tipo_labor.tl_descripcion',
      'labor.lab_horas',
      //CONSULTA PENDIENTE PARA LA DESCRIPCIÓN
      'periodo.per_fecha_inicio',
      'periodo.per_fecha_fin',
      'evaluacion.eva_estado',
      'evaluacion.eva_resultado',
      'evaluacion.eva_puntaje'
    )
    .where('periodo.per_nombre','like',nombrePeriodo)

    if(results.length > 0){
      api.setResult(results)
    }
    else{
      api.setState(404,"Error", "No hubo resultados para ese periodo")
    }

    return response.json(api.toResponse())
  }

  public async store({request, response}: HttpContextContract) {
    const {eva_estado, eva_puntaje, eva_resultado, lab_id, per_id, usu_id} = request.all()

    const labor = await Labor.findByOrFail('lab_id',lab_id)
    const periodo = await Periodo.findByOrFail('per_id',per_id)
    const usuario = await UsuarioRol.findByOrFail('usu_id',usu_id)
    const api = new Api()
    const newEval = new Evaluacion()

    if(eva_estado != null &&
      eva_puntaje != null &&
      eva_resultado != null &&
      lab_id != null &&
      per_id != null &&
      usu_id != null){

        newEval.eva_estado = eva_estado
        newEval.eva_puntaje = eva_puntaje
        newEval.eva_resultado = eva_resultado
        newEval.lab_id = labor.lab_id
        newEval.per_id = periodo.per_id
        newEval.usu_id = usuario.usu_id
        const results = await newEval.save()
        api.setResult(results)
    }
    else{
      api.setState(404,"Error", "No se pudo crear la evaluacion")
    }
    return response.json(api.toResponse())
  }

  public async updateResult({request, response}: HttpContextContract) {
    const api = new Api()
    const cuerpo = request.only(['eva_id','eva_resultado'])

    const evaluacion = await Evaluacion.findByOrFail("eva_id",cuerpo.eva_id)

    if(evaluacion!=null){
      const results = await evaluacion.merge(cuerpo).save()
      api.setResult(results)
    }else{
      api.setState(404,"Error", "No se pudo actualizar el resultado de la evaluacion")
    }
    return response.json(api.toResponse())
  }

  public async destroy({request, response}: HttpContextContract) {
    const api =  new Api()
    const eval_id = request.param('id')
    const evaluacion = await Evaluacion.findOrFail(eval_id)

    if(evaluacion!=null) {
      const results = await evaluacion.delete()
      api.setResult(results)
    }else{
      api.setState(404,"Error", "No se pudo obtener la evaluacion para poder eliminarla")
    }
    return response.json(api.toResponse())
  }
}
