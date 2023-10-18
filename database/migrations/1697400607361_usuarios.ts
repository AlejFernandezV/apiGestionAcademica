import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'usuario'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('usu_id')
      table.string('usu_email', 50)
      table.string('usu_password', 1000)
      table.string('usu_nombre', 50)
      table.string('usu_apellido', 50)
      table.string('usu_genero', 1),
      table.string('usu_estudio', 50)
      table.timestamps()

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
