import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import TipoLabor from 'app/Models/TipoLabor'

export default class Labor extends BaseModel {
  @column({ columnName: 'lab_id',isPrimary: true })
  public id: number

  @column({columnName: 'lab_nombre'})
  public lab_nombre: string

  @column({columnName: 'lab_horas' })
  public lab_horas: number

  @hasMany(()=>TipoLabor, {
    foreignKey: 'tl_id',
  })
  public tipo_labores: HasMany<typeof TipoLabor>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
