import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'evaluacion'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('eva_id')
      table.integer('lab_id').unsigned().references('lab_id').inTable('labor')
      table.integer('per_id').unsigned().references('per_id').inTable('periodo')
      table.integer('usu_id').unsigned().references('usu_id').inTable('usuario_rol')
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
