import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'notificaciones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('noti_id')
      table.integer('usu_id').unsigned().references('usu_id').inTable('usuario').notNullable().onDelete('CASCADE').onUpdate('CASCADE')
      table.string('noti_contenido',200).notNullable()
      table.string('noti_ruta',200).notNullable()
      table.string('noti_estado',100).notNullable()
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
