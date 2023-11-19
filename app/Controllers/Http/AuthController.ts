//import type { HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Api from 'App/Helpers/ResponseApi'
import Usuario from 'App/Models/Usuario/UsuarioModel'
import Hash from '@ioc:Adonis/Core/Hash'
import Database from '@ioc:Adonis/Lucid/Database'

export default class AuthController{
  public async login({auth,request,response}){
    const api = new Api()
    const data = request.only(['usu_email','usu_password'])
    try{
      const loginResult = await Database
        .from("usuario")
        .select("usuario.usu_id","usuario.usu_password","rol.rol_descripcion")
        .join("usuario_rol","usuario.usu_id","usuario_rol.usu_id")
        .join("rol","usuario_rol.rol_id","rol.rol_id")
        .where("usu_email", data.usu_email)
        .firstOrFail()
      if (!(await Hash.verify(loginResult.usu_password, data.usu_password))) {
        api.setState(404,"Error","Contraseña no válida")
      }
      const token = await auth.use("api").generate(loginResult, {
        expiresIn: '1 days'
      })
      const results = {
        rol_description: loginResult.rol_descripcion,
        token: token
      }

      api.setResult(results)
    }catch(error){
      console.log(error)
      api.setState(404,"Error","El usuario no existe")
    }finally{
      return response.json(api.toResponse())
    }
  }

  public async logout({auth,response}) {
    const api = new Api()
    await auth.use('api').revoke()
    api.setResult({revoked: true})
    return response.json(api.toResponse())
  }

}
