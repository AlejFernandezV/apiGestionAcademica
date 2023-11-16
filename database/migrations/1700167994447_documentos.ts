import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'documentos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('doc_id')
      table.integer('eva_id').unsigned().references('eva_id').inTable('evaluacion').notNullable()
      table.string('doc_nombre',100).notNullable()
      table.string('doc_ruta', 200).notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
