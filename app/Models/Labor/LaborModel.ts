import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import TipoLabor from 'App/Models/TipoLabor/TipoLaborModel'

export default class Labor extends BaseModel {

  public static table = 'labor'

  @column({ columnName: 'lab_id',isPrimary: true})
  public lab_id: number

  @column({columnName: 'lab_nombre'})
  public lab_nombre: string

  @column({columnName: 'lab_horas' })
  public lab_horas: number

  @column({columnName: 'tl_id'})
  public tl_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //Relaciones
  @hasMany(()=>TipoLabor, {
    foreignKey: 'tl_id',
  })
  public tipo_labores: HasMany<typeof TipoLabor>
}
