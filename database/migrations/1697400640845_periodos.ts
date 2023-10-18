import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'periodos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('per_id')
      table.string('per_nombre', 50)
      table.date('per_fecha_inicio')
      table.date('per_fecha_fin')
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
