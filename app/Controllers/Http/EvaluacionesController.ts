import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class EvaluacionesController {
  /*
  public async index({}: HttpContextContract) {
    return await Evaluacion.all()
  }
  */
  public async index({request}: HttpContextContract) {
    const {idDocente,nombrePeriodo} = request.all()

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
      'evaluacion.eva_resultado'
    )
    .where('usuario_rol.usu_id','=',idDocente).andWhere('periodo.per_nombre','like',nombrePeriodo)
  }

  public async create({}: HttpContextContract) {
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
