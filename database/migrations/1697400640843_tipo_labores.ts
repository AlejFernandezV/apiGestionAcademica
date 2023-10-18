import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tipo_labor'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('tl_id')
      table.string('tl_codigo', 3)
      table.string('tl_descripcion', 50)
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
