import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UsuarioRol extends BaseModel {
  @column({ columnName: 'usu_id',isPrimary: true })
  public usu_id: number

  @column({ columnName: 'rol_id',isPrimary: true })
  public rol_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
