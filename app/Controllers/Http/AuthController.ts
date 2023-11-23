import Api from 'App/Helpers/ResponseApi'
import Hash from '@ioc:Adonis/Core/Hash'
import Database from '@ioc:Adonis/Lucid/Database'
import type { HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class AuthController{
  public async login({auth,request,response}:HttpContextContract){
    const api = new Api()
    const data = request.only(['usu_email','usu_password'])
    try{
      const loginResult = await Database
        .from("usuario")
        .select("usuario.usu_id",'usuario.usu_num_doc','usuario.usu_nombre','usuario.usu_apellido',"usuario.usu_email","usuario.usu_password","rol.rol_descripcion")
        .join("usuario_rol","usuario.usu_id","usuario_rol.usu_id")
        .join("rol","usuario_rol.rol_id","rol.rol_id")
        .where("usu_email", data.usu_email)
        .firstOrFail()

      if (!(await Hash.verify(loginResult.usu_password, data.usu_password))) {
        api.setState(404,"Error","Contraseña/Usuario no válidos")
      }
      const token = await auth.use("api").generate(loginResult, {
        expiresIn: '1 days'
      })

      const results = {
        usu_id: loginResult.usu_id,
        rol_descripcion: loginResult.rol_descripcion,
        token: token
      }

      api.setResult(results)
    }catch(error){
      console.log(error)
      api.setState(404,"Error","Contraseña/Usuario no válidos")
    }finally{
      return response.json(api.toResponse())
    }
  }

  public async logout({auth,response}:HttpContextContract) {
    const api = new Api()
    await auth.use('api').revoke()
    api.setResult({revoked: true})
    return response.json(api.toResponse())
  }
}
