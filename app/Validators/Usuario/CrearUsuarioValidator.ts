import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CrearUsuarioValidator {
  constructor(protected ctx: HttpContextContract) {}
  private generos = ['M','F']
  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    usu_email: schema.string([rules.email(), rules.unique({table: 'usuario', column: 'usu_email'})]),
    usu_password: schema.string([rules.maxLength(20)]),
    usu_nombre: schema.string([rules.maxLength(50)]),
    usu_apellido: schema.string([rules.maxLength(50)]),
    usu_genero: schema.string([rules.notIn(this.generos)]),
    usu_estudio: schema.string([rules.maxLength(50)]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'usu_email.string.email': 'El correo no es valido',
    'usu_email.string.unique': 'El correo ya se encuentra registrado',
    'usu_password.string.maxLength': 'La contraseña no puede tener más de 20 caracteres',
    'usu_nombre.string.maxLength': 'El nombre no puede tener más de 50 caracteres',
    'usu_apellido.string.maxLength': 'El apellido no puede tener mas de 50 caracteres',
    'usu_genero.string.notIn': 'El genero no es válido',
    'usu_estudio.string.maxLength': 'El estudio no puede tener mas de 50 caracteres',
  }
}
