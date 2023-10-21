import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'usuario'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('usu_id')
      table.string('usu_email', 50).notNullable()
      table.string('usu_password', 1000).notNullable()
      table.string('usu_nombre', 50).notNullable()
      table.string('usu_apellido', 50).notNullable()
      table.string('usu_genero', 1).notNullable()
      table.string('usu_estudio', 50).notNullable()
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
