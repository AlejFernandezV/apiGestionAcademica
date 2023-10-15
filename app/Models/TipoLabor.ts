import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class TipoLabor extends BaseModel {
  @column({columnName: 'tl_id' ,isPrimary: true })
  public tl_id: number

  @column({columnName: 'tl_codigo'})
  public tl_codigo: string

  @column({columnName: 'tl_descripcion'})
  public tl_descripcion: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
