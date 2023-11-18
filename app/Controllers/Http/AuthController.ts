//import type { HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Api from 'App/Helpers/ResponseApi'
import Usuario from 'App/Models/Usuario/UsuarioModel'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthController{
  public async login({auth,request,response}){
    const api = new Api()
    const data = request.only(['usu_email','usu_password'])
    try{
      // Lookup usuario manually
      const usuario = await Usuario.query()
        .where("usu_email", data.usu_email)
        .firstOrFail();

      // Verify password
      if (!(await Hash.verify(usuario.usu_password, data.usu_password))) {
        api.setState(404,"Error","Contraseña no válida")
      }
      // Generate token
      const token = await auth.use("api").generate(usuario, {
        expiresIn: '1 days'
      });
      api.setResult(token);
    }catch(error){
      console.log(error);
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
