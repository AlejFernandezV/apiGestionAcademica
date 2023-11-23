import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'periodo'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('per_id')
      table.string('per_nombre', 50).notNullable()
      table.integer('per_anio').notNullable()
      table.integer('per_semestre').notNullable()
      table.date('per_fecha_inicio').notNullable()
      table.date('per_fecha_fin').notNullable()
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
