import Labor from 'App/Models/Labor/LaborModel'
import Database from '@ioc:Adonis/Lucid/Database'
import TipoLabor from 'App/Models/TipoLabor/TipoLaborModel'
export default class LaboresController {
  public async indexAll() {
    return await Database
    .from('labor')
    .join('tipo_labor','labor.tl_id','tipo_labor.tl_id')
    .select('labor.lab_id','labor.lab_nombre','labor.lab_horas','tipo_labor.tl_descripcion')
    .orderBy('labor.lab_id')
  }

  public async indexAllNamesTL(){
    return await TipoLabor
    .query()
    .select('tl_id','tl_descripcion')
    .orderBy('tl_id')
  }

  public async store(labor: Labor) {
    try{
      return await Labor.create(labor)
    }catch(error){
      console.log(error)
      return null
    }
  }

  public async findByName(nombreLabor:string) {
    try{
      return await Labor.findByOrFail("lab_nombre",nombreLabor)
    }catch(error){
      console.log(error);
      return null
    }
  }

  public async update(data:any) {
    try{
      const idTipoLabor = (await TipoLabor.findByOrFail("tl_descripcion",data.tl_descripcion))
      const labor = await Labor.findOrFail(data.lab_id)
      return labor.merge({
        lab_nombre: data.lab_nombre,
        lab_horas: data.lab_horas,
        tl_id: idTipoLabor.tl_id
      }).save()
    }catch(error){
      console.log(error);
      return null
    }
  }

  public async destroy(nombreLabor:string) {
    try{
      const labor = await Labor.findByOrFail("lab_nombre",nombreLabor)
      return await labor.delete()
    }catch(error){
      console.log(error);
      return null
    }
  }
}
