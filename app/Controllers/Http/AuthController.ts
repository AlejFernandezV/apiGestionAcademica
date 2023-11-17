//import type { HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Api from 'App/Helpers/ResponseApi'
import Usuario from 'App/Models/Usuario/UsuarioModel'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthController{
  public async login({auth,request,response}){
    const api = new Api()
    const data = request.only(['usu_email','usu_password'])
    try{
      const usuario = await Usuario.query().where('usu_email',data.usu_email).firstOrFail()

      if(!(await Hash.verify(usuario.usu_password,data.usu_password))){
        api.setResult("No valido")
        api.setState(404,"Error","Contraseña inválida")
      }else{
        await auth.use('web').login(usuario)
        api.setResult("Inicio de sesión exitoso")
      }
    }catch(error){
      api.setState(404,"Error","El usuario no existe")
    }finally{
      return response.json(api.toResponse())
    }
  }

  public async logout({auth,response}) {
    const api = new Api()
    await auth.logout()
    api.setResult("Cerrado de sesión exitoso")
    return response.json(api.toResponse())
  }

}
