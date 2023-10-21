import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'labor'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('lab_id')
      table.string('lab_nombre', 50).notNullable()
      table.integer('lab_horas').notNullable()
      table.integer('tl_id').unsigned().references('tl_id').inTable('tipo_labor')
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
