import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Periodo extends BaseModel {
  public static table = 'periodo'

  @column({ columnName: 'per_id',isPrimary: true })
  public per_id: number

  @column({columnName: 'per_nombre'})
  public per_nombre: string

  @column.dateTime()
  public per_fecha_inicio: DateTime

  @column.dateTime()
  public per_fecha_fin: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}