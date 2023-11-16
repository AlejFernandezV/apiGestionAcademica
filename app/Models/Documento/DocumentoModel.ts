import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Documento extends BaseModel {
  @column({columnName: 'doc_id',isPrimary: true })
  public doc_id: number

  @column({columnName: 'eva_id'})
  public eva_id:number

  @column({columnName: 'doc_nombre'})
  public doc_nombre: string

  @column({columnName: 'doc_ruta'})
  public doc_ruta: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
