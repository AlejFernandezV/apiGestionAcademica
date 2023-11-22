import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Api from 'App/Helpers/ResponseApi'
import Evaluacion from 'App/Models/Evaluacion/EvaluacionModel'
import Labor from 'App/Models/Labor/LaborModel'
import Periodo from 'App/Models/Periodo/PeriodoModel'
import UsuarioRol from 'App/Models/UsuarioRol/UsuarioRolModel'


export default class EvaluacionesController {

  public async index() {
    return await Database
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

  }

  public async indexByDocente(idDocente: number) {
    return await Database
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
  }

  public async indexByPeriodo(nombrePeriodo: string) {
    return await Database
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
  }

  public async store(evaluacion: Evaluacion) {
    return await Evaluacion.create(evaluacion)
  }

  public async updateResult(data: any) {
    try{
      const evaluacion = await Evaluacion.findByOrFail("eva_id",data.eva_id)
      return await evaluacion.merge(data).save()
    }catch(error){
      console.log(error)
      return null
    }
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
