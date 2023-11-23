import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, column, manyToMany, beforeSave } from '@ioc:Adonis/Lucid/Orm'
import Rol from 'App/Models/Rol/RolModel'
import Hash from '@ioc:Adonis/Core/Hash'

export default class Usuario extends BaseModel {

  public static table = 'usuario'

  @column({columnName: 'usu_id', isPrimary: true})
  public usu_id: number

  @column({columnName: 'usu_num_doc'})
  public usu_num_doc: number

  @column({columnName: 'usu_tipo_doc'})
  public usu_tipo_doc: string

  @column({columnName: 'usu_token_remember'})
  public usu_token_remember: string | null

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

  @column({columnName: 'usu_estado'})
  public usu_estado: string

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

  @beforeSave()
  public static async hashPassword(usuario: Usuario){
    if(usuario.$dirty.usu_password){
      usuario.usu_password = await Hash.make(usuario.usu_password)
    }
  }
}
