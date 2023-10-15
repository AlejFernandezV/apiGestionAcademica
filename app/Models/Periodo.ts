import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Periodo extends BaseModel {
  @column({ columnName: 'per_id',isPrimary: true })
  public per_id: number

  @column({columnName: 'per_nombre'})
  public per_nombre: string

  @column.dateTime()
  public per_fechaInicio: DateTime

  @column.dateTime()
  public per_fechaFin: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
