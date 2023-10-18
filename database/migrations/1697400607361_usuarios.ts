import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'usuarios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('usr_nombre', 50)
      table.string('usr_apellido', 50)
      table.string('usr_genero', 1),
      table.string('usr_estudio', 50)
      table.string('usr_email', 50)
      table.string('usr_password', 1000)
      table.timestamps()
   
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
