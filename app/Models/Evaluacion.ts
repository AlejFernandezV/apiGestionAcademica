import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Labor from 'app/Models/Labor'
import Periodo from 'app/Models/Periodo'
import Usuario_rol from 'app/Models/Usuario_rol'

export default class Evaluacion extends BaseModel {

  //Columnas propias de la tabla
  @column({ columnName: 'eva_id',isPrimary: true })
  public eva_id: number

  @column({columnName: 'eva_estado'})
  public eva_estado: number

  @column({columnName: 'eva_puntaje'})
  public eva_puntaje: number

  @column({columnName: 'eva_resultado'})
  public eva_resultado: string

  //Relaciones

  @hasMany(() => Labor, {
    foreignKey: 'lab_id',
  })
  public labores: HasMany<typeof Labor>

  @hasMany(() => Periodo, {
    foreignKey: 'per_id',
  })
  public periodos: HasMany<typeof Periodo>

  @manyToMany(()=>Usuario_rol)
  public usuarios: ManyToMany<typeof Usuario_rol>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
