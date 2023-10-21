import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Rol extends BaseModel {

  public static table = 'rol'

  @column({columnName: 'rol_id', isPrimary: true })
  public rol_id: number

  @column({columnName: 'rol_descripcion'})
  public rol_descripcion: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
