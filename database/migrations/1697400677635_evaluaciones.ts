import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'evaluacions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned()
      table.integer('lab_id').unsigned().references('id').inTable('labors')
      table.integer('per_id').unsigned().references('id').inTable('periodos')
      table.smallint('eva_estado')
      table.float('eva_puntaje', 4,2)
      table.string('eva_resultado', 1000)
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
