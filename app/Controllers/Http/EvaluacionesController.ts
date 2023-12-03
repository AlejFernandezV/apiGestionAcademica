import Database from '@ioc:Adonis/Lucid/Database'
import Evaluacion from 'App/Models/Evaluacion/EvaluacionModel'

export default class EvaluacionesController {

  public async indexAllForDean() {
    return await Database
    .from('evaluacion')
    .innerJoin('usuario_rol','evaluacion.usu_id','usuario_rol.usu_id')
    .innerJoin('usuario','usuario_rol.usu_id','usuario.usu_id')
    .innerJoin('rol','usuario_rol.rol_id','rol.rol_id')
    .innerJoin('periodo','evaluacion.per_id','periodo.per_id')
    .innerJoin('labor', 'evaluacion.lab_id','labor.lab_id')
    .innerJoin('tipo_labor','labor.tl_id','tipo_labor.tl_id')
    .select(
      'eva_id',
      'periodo.per_nombre',
      'usuario.usu_nombre',
      'usuario.usu_apellido',
      'labor.lab_nombre',
      'tipo_labor.tl_descripcion',
      'labor.lab_horas',
      'periodo.per_fecha_inicio',
      'periodo.per_fecha_fin',
      'evaluacion.eva_estado',
      'evaluacion.eva_resultado',
      'evaluacion.eva_puntaje'
    )
    .where('rol.rol_id','=','5')
    .orderBy('usuario.usu_nombre','asc')
    .orderBy('periodo.per_nombre','asc')
    .orderBy('labor.lab_nombre','asc')
    .orderBy('labor.lab_horas','asc')
  }

  public async indexAllForCoord() {
    return await Database
    .from('evaluacion')
    .innerJoin('usuario_rol','evaluacion.usu_id','usuario_rol.usu_id')
    .innerJoin('usuario','usuario_rol.usu_id','usuario.usu_id')
    .innerJoin('rol','usuario_rol.rol_id','rol.rol_id')
    .innerJoin('periodo','evaluacion.per_id','periodo.per_id')
    .innerJoin('labor', 'evaluacion.lab_id','labor.lab_id')
    .innerJoin('tipo_labor','labor.tl_id','tipo_labor.tl_id')
    .select(
      'eva_id',
      'periodo.per_nombre',
      'usuario.usu_nombre',
      'usuario.usu_apellido',
      'labor.lab_nombre',
      'tipo_labor.tl_descripcion',
      'labor.lab_horas',
      'periodo.per_fecha_inicio',
      'periodo.per_fecha_fin',
      'evaluacion.eva_estado',
      'evaluacion.eva_resultado',
      'evaluacion.eva_puntaje'
    )
    .where('rol.rol_id','!=','6')
    .andWhere('rol.rol_id','!=','5')
    .orderBy('usuario.usu_nombre','asc')
    .orderBy('periodo.per_nombre','asc')
    .orderBy('labor.lab_nombre','asc')
    .orderBy('labor.lab_horas','asc')
  }

  public async indexByDocenteNombApel(nombre: string, apellido:string) {
    return await Database
    .from('evaluacion')
    .innerJoin('usuario_rol','evaluacion.usu_id','usuario_rol.usu_id')
    .innerJoin('usuario','usuario_rol.usu_id','usuario.usu_id')
    .innerJoin('periodo','evaluacion.per_id','periodo.per_id')
    .innerJoin('labor', 'evaluacion.lab_id','labor.lab_id')
    .innerJoin('tipo_labor','labor.tl_id','tipo_labor.tl_id')
    .select(
      'eva_id',
      'periodo.per_nombre',
      'labor.lab_nombre',
      'tipo_labor.tl_descripcion',
      'labor.lab_horas',
      'periodo.per_fecha_inicio',
      'periodo.per_fecha_fin',
      'evaluacion.eva_estado',
      'evaluacion.eva_resultado',
      'evaluacion.eva_puntaje'
    )
    .where('usuario.usu_nombre','like',nombre)
    .andWhere('usuario.usu_apellido','like',apellido)
    .orderBy('periodo.per_nombre','asc')
    .orderBy('labor.lab_nombre','asc')
    .orderBy('labor.lab_horas','asc')
  }

  public async indexByDocenteNumDoc(num_doc:number) {
    return await Database
    .from('evaluacion')
    .innerJoin('usuario_rol','evaluacion.usu_id','usuario_rol.usu_id')
    .innerJoin('usuario','usuario_rol.usu_id','usuario.usu_id')
    .innerJoin('periodo','evaluacion.per_id','periodo.per_id')
    .innerJoin('labor', 'evaluacion.lab_id','labor.lab_id')
    .innerJoin('tipo_labor','labor.tl_id','tipo_labor.tl_id')
    .select(
      'eva_id',
      'periodo.per_nombre',
      'labor.lab_nombre',
      'tipo_labor.tl_descripcion',
      'labor.lab_horas',
      'periodo.per_fecha_inicio',
      'periodo.per_fecha_fin',
      'evaluacion.eva_estado',
      'evaluacion.eva_resultado',
      'evaluacion.eva_puntaje'
    )
    .where('usuario.usu_num_doc','=',num_doc)
    .orderBy('periodo.per_nombre','asc')
    .orderBy('labor.lab_nombre','asc')
    .orderBy('labor.lab_horas','asc')
  }

  public async indexById(eva_id: number) {
    return await Database
    .from('evaluacion')
    .innerJoin('usuario_rol','evaluacion.usu_id','usuario_rol.usu_id')
    .innerJoin('usuario','usuario_rol.usu_id','usuario.usu_id')
    .innerJoin('periodo','evaluacion.per_id','periodo.per_id')
    .innerJoin('labor', 'evaluacion.lab_id','labor.lab_id')
    .innerJoin('tipo_labor','labor.tl_id','tipo_labor.tl_id')
    .select(
      'eva_id',
      'usuario.usu_id',
      'evaluacion.eva_estado',
      'evaluacion.eva_resultado',
      'evaluacion.eva_puntaje',
      'evaluacion.updated_at'
    )
    .where('evaluacion.eva_id','=',eva_id)
    .firstOrFail()
  }

  public async indexByPeriodo(nombrePeriodo: string) {
    return await Database
    .from('evaluacion')
    .innerJoin('usuario_rol','evaluacion.usu_id','usuario_rol.usu_id')
    .innerJoin('periodo','evaluacion.per_id','periodo.per_id')
    .innerJoin('labor', 'evaluacion.lab_id','labor.lab_id')
    .innerJoin('tipo_labor','labor.tl_id','tipo_labor.tl_id')
    .select(
      'eva_id',
      'periodo.per_nombre',
      'labor.lab_nombre',
      'tipo_labor.tl_descripcion',
      'labor.lab_horas',
      'periodo.per_fecha_inicio',
      'periodo.per_fecha_fin',
      'evaluacion.eva_estado',
      'evaluacion.eva_resultado',
      'evaluacion.eva_puntaje'
    )
    .where('periodo.per_nombre','like',nombrePeriodo)
    .orderBy('labor.lab_nombre','asc')
    .orderBy('labor.lab_horas','asc')
  }

  public async indexByNumDocPeriodo(usu_num_doc:number,nombrePeriodo: string) {
    return await Database
    .from('evaluacion')
    .innerJoin('usuario_rol','evaluacion.usu_id','usuario_rol.usu_id')
    .innerJoin('usuario','usuario.usu_id','usuario_rol.usu_id')
    .innerJoin('periodo','evaluacion.per_id','periodo.per_id')
    .innerJoin('labor', 'evaluacion.lab_id','labor.lab_id')
    .innerJoin('tipo_labor','labor.tl_id','tipo_labor.tl_id')
    .select(
      'eva_id',
      'periodo.per_nombre',
      'labor.lab_nombre',
      'tipo_labor.tl_descripcion',
      'labor.lab_horas',
      'periodo.per_fecha_inicio',
      'periodo.per_fecha_fin',
      'evaluacion.eva_estado',
      'evaluacion.eva_resultado',
      'evaluacion.eva_puntaje'
    )
    .where('usuario.usu_num_doc','=',usu_num_doc)
    .andWhere('periodo.per_nombre','like',nombrePeriodo)
    .orderBy('periodo.per_nombre','asc')
    .orderBy('labor.lab_nombre','asc')
    .orderBy('labor.lab_horas','asc')
  }

  public async indexAllActive() {
    return await Database
    .from('evaluacion')
    .join('usuario_rol','evaluacion.usu_id','usuario_rol.usu_id')
    .join('periodo','evaluacion.per_id','periodo.per_id')
    .join('labor', 'evaluacion.lab_id','labor.lab_id')
    .join('tipo_labor','labor.tl_id','tipo_labor.tl_id')
    .select(
      'eva_id',
      'periodo.per_nombre',
      'labor.lab_nombre',
      'tipo_labor.tl_descripcion',
      'labor.lab_horas',
      'periodo.per_fecha_inicio',
      'periodo.per_fecha_fin',
      'evaluacion.eva_estado',
      'evaluacion.eva_resultado',
      'evaluacion.eva_puntaje'
    )
    .where('eva_estado','like','En ejecución')
    .orderBy('usuario.usu_nombre','asc')
    .orderBy('periodo.per_nombre','asc')
    .orderBy('labor.lab_nombre','asc')
    .orderBy('labor.lab_horas','asc')
  }

  public async indexAllInactive() {
    return await Database
    .from('evaluacion')
    .join('usuario_rol','evaluacion.usu_id','usuario_rol.usu_id')
    .join('periodo','evaluacion.per_id','periodo.per_id')
    .join('labor', 'evaluacion.lab_id','labor.lab_id')
    .join('tipo_labor','labor.tl_id','tipo_labor.tl_id')
    .select(
      'eva_id',
      'periodo.per_nombre',
      'labor.lab_nombre',
      'tipo_labor.tl_descripcion',
      'labor.lab_horas',
      'periodo.per_fecha_inicio',
      'periodo.per_fecha_fin',
      'evaluacion.eva_estado',
      'evaluacion.eva_resultado',
      'evaluacion.eva_puntaje'
    )
    .where('eva_estado','like','Suspendido')
    .orderBy('usuario.usu_nombre','asc')
    .orderBy('periodo.per_nombre','asc')
    .orderBy('labor.lab_nombre','asc')
    .orderBy('labor.lab_horas','asc')
  }

  public async indexAllFinished() {
    return await Database
    .from('evaluacion')
    .join('usuario_rol','evaluacion.usu_id','usuario_rol.usu_id')
    .join('periodo','evaluacion.per_id','periodo.per_id')
    .join('labor', 'evaluacion.lab_id','labor.lab_id')
    .join('tipo_labor','labor.tl_id','tipo_labor.tl_id')
    .select(
      'eva_id',
      'periodo.per_nombre',
      'labor.lab_nombre',
      'tipo_labor.tl_descripcion',
      'labor.lab_horas',
      'periodo.per_fecha_inicio',
      'periodo.per_fecha_fin',
      'evaluacion.eva_estado',
      'evaluacion.eva_resultado',
      'evaluacion.eva_puntaje'
    )
    .where('eva_estado','like','Terminado')
    .orderBy('usuario.usu_nombre','asc')
    .orderBy('periodo.per_nombre','asc')
    .orderBy('labor.lab_nombre','asc')
    .orderBy('labor.lab_horas','asc')
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
      'eva_id',
      'periodo.per_nombre',
      'labor.lab_nombre',
      'tipo_labor.tl_descripcion',
      'labor.lab_horas',
      'periodo.per_fecha_inicio',
      'periodo.per_fecha_fin',
      'evaluacion.eva_estado',
      'evaluacion.eva_resultado',
      'evaluacion.eva_puntaje'
    )
    .where('usuario.usu_num_doc','=',num_doc)
    .andWhere("evaluacion.eva_estado","like","En ejecución")
    .orderBy('periodo.per_nombre','asc')
    .orderBy('labor.lab_nombre','asc')
    .orderBy('labor.lab_horas','asc')
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
      'eva_id',
      'periodo.per_nombre',
      'labor.lab_nombre',
      'tipo_labor.tl_descripcion',
      'labor.lab_horas',
      'periodo.per_fecha_inicio',
      'periodo.per_fecha_fin',
      'evaluacion.eva_estado',
      'evaluacion.eva_resultado',
      'evaluacion.eva_puntaje'
    )
    .where('usuario.usu_num_doc','=',num_doc)
    .andWhere("evaluacion.eva_estado","like","Terminado")
    .orderBy('periodo.per_nombre','asc')
    .orderBy('labor.lab_nombre','asc')
    .orderBy('labor.lab_horas','asc')
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
