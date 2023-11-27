import { BaseModel, ManyToMany, column, manyToMany } from "@ioc:Adonis/Lucid/Orm"
import { DateTime } from "luxon"
import Usuario from "../Usuario/UsuarioModel"

export default class NotificacionModel extends BaseModel {

  public static table = 'notificaciones'

  @column({columnName:"noti_id"})
  public noti_id: number

  @column({columnName:"usu_id"})
  public usu_id: number

  @column({columnName:"noti_contenido"})
  public noti_contenido: string

  @column({columnName:"noti_ruta"})
  public noti_ruta: string

  @column({columnName:"noti_estado"})
  public noti_estado: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(()=>Usuario)
  public usuarios: ManyToMany<typeof Usuario>
}
