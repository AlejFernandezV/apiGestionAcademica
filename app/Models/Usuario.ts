import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Rol from './Rol'

export default class Usuario extends BaseModel {
  @column({columnName: 'usu_id', isPrimary: true })
  public usu_id: number

  @column({columnName: 'usu_email'})
  public usu_email: string

  @column({ columnName: 'usu_password', serializeAs: null})
  public usu_password: string

  @column({columnName: 'usu_nombre'})
  public usu_nombre: string

  @column({columnName: 'usu_apellido'})
  public usu_apellido: string

  @column({columnName: 'usu_genero'})
  public usu_genero: string

  @column({columnName: 'usu_estudio'})
  public usu_estudio: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(()=>Rol ,{
    pivotTable: 'usuario_rol',
    localKey: 'id',
    pivotForeignKey: 'usu_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'rol_id',
  })
  public roles: ManyToMany<typeof Rol>
}
