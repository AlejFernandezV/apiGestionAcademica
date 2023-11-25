import Database from '@ioc:Adonis/Lucid/Database'
import Evaluacion from 'App/Models/Evaluacion/EvaluacionModel'

export default class EvaluacionesController {

  public async indexAll() {
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

  public async indexByDocente(num_doc: number) {
    return await Database
    .from('evaluacion')
    .join('usuario_rol','evaluacion.usu_id','usuario_rol.usu_id')
    .join('usuario','usuario_rol.usu_id','usuario.usu_id')
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
    .where('usuario.usu_num_doc','=',num_doc)
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

  public async indexAllActive() {
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
    .where('eva_estado','like','En ejecución')
  }

  public async indexAllInactive() {
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
    .where('eva_estado','like','Suspendido')
  }

  public async indexAllFinished() {
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
    .where('eva_estado','like','Terminado')
  }

  public async indexAllActiveByDocente(num_doc: number){
    return await Database
    .from('evaluacion')
    .join('usuario_rol','evaluacion.usu_id','usuario_rol.usu_id')
    .join('usuario','usuario.usu_id','usuario_rol.usu_id')
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
    .where('usuario.usu_num_doc','=',num_doc)
    .andWhere("evaluacion.eva_estado","like","En ejecución")
  }

  public async indexAllInactiveByDocente(num_doc: number){
    return await Database
    .from('evaluacion')
    .join('usuario_rol','evaluacion.usu_id','usuario_rol.usu_id')
    .join('usuario','usuario.usu_id','usuario_rol.usu_id')
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
    .where('usuario.usu_num_doc','=',num_doc)
    .andWhere("evaluacion.eva_estado","like","Terminado")
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

  public async updateState(data: any) {
    try{
      const evaluacion = await Evaluacion.findByOrFail("eva_id",data.eva_id)
      return await evaluacion.merge(data).save()
    }catch(error){
      console.log(error)
      return null
    }
  }

  public async destroy(eva_id: number) {
    try{
      const evaluacion = await Evaluacion.findOrFail(eva_id)
      await evaluacion.delete()
      return true
    }catch(error){
      return false
    }
  }
}
