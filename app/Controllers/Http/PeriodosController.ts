import Periodo from 'App/Models/Periodo/PeriodoModel'

export default class PeriodosController {
  public async showAll() {
    return await Periodo
    .query()
    .from('periodo')
    .select('per_nombre','per_anio','per_semestre','per_fecha_inicio','per_fecha_fin')
    .orderBy('per_id')
  }

  public async showAllNames(){
    return await Periodo
    .query()
    .from('periodo')
    .select('per_nombre')
    .orderBy('per_id')
  }

  public async store(periodo: Periodo) {
    try{
      return await Periodo.create(periodo)
    }catch(error){
      console.log(error);
      return 404
    }
  }

  public async findByName(per_nombre: string) {
    try {
      return await Periodo.findByOrFail("per_nombre", per_nombre);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async update(data:any) {
    try{
      const periodo = await Periodo.findOrFail(data.per_id)
      return await periodo.merge(data).save()
    }catch(error){
      console.log(error);
      return 404
    }
  }

  public async destroy(per_nombre:string) {
    try{
      const periodo = await Periodo.findByOrFail("per_nombre",per_nombre)
      return await periodo.delete()
    }catch(error){
      console.log(error);
      return 404
    }
  }
}
