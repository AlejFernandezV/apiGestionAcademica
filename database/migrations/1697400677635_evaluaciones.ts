import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'evaluacion'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('eva_id')
      table.integer('lab_id').unsigned().references('lab_id').inTable('labor').notNullable()
      table.integer('per_id').unsigned().references('per_id').inTable('periodo').notNullable()
      table.integer('usu_id').unsigned().references('usu_id').inTable('usuario_rol').notNullable().onDelete('CASCADE')
      table.string('eva_estado',100).notNullable()
      table.float('eva_puntaje', 4,2).notNullable()
      table.string('eva_resultado', 1000).notNullable()
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
