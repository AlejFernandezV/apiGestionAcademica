import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CrearEvaluacionValidator {
  constructor(protected ctx: HttpContextContract) {}
  private estados = ['En ejecución','Terminado','Suspendido'];
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
    eva_estado: schema.string([rules.notIn(this.estados)]),
    eva_puntaje: schema.number([rules.unsigned(), rules.range(0,100)]),
    eva_resultado: schema.string([rules.maxLength(1000)])
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
    'eva_estado.string.notIn': 'El estado no es valido',
    'eva_resultado.number.maxLength': 'El resultado no puede tener mas de 1000 caracteres',
    'eva_puntaje.number.unsigned': 'El puntaje debe ser un numero entero positivo',
    'eva_puntaje.number.range': 'El puntaje debe estar entre 0 y 100',
  }
}
