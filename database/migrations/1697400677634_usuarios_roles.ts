import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'usuario_rol'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('usu_id').unsigned().references('id').inTable('usuario').onDelete('CASCADE')
      table.integer('rol_id').unsigned().references('rol_id').inTable('rol')
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
