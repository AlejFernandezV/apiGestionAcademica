import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'rol'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('rol_id')
      table.string('rol_descripcion', 50).notNullable()
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
