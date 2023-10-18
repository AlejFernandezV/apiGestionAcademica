import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'usuario_rols'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('usr_id').unsigned().references('id').inTable('usuarios')
      table.integer('rol_id').unsigned().references('id').inTable('rols')
      table.integer('eva_id').unsigned().references('id').inTable('evaluacions')
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
