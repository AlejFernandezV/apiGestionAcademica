import Api from "App/Helpers/ResponseApi";
import Hash from "@ioc:Adonis/Core/Hash";
import Database from "@ioc:Adonis/Lucid/Database";
import UsuariosController from "./UsuariosController";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class AuthController {

  public async login({ auth, request, response }: HttpContextContract) {
    const api = new Api();
    const usuController = new UsuariosController()
    const data = request.only(["usu_email", "usu_password"]);
    try {
      let token: any;

      const loginResult = await Database.from("usuario")
        .select(
          "usuario.usu_id",
          "usuario.usu_num_doc",
          "usu_token_remember",
          "usuario.usu_password",
          "rol.rol_descripcion"
        )
        .join("usuario_rol", "usuario.usu_id", "usuario_rol.usu_id")
        .join("rol", "usuario_rol.rol_id", "rol.rol_id")
        .where("usu_email", data.usu_email)
        .firstOrFail();

      if (!(await Hash.verify(loginResult.usu_password, data.usu_password))) {
        api.setState(
          404,
          "Error",
          "Credenciales incorrectas, intente de nuevo"
        );
        return response.json(api.toResponse);
      }

      token = await this.verifyTokenExists(loginResult.usu_id)

      if (token === null) {
        token = await auth
          .use("api")
          .generate(loginResult, { expiresIn: "1 days" })
      } else if (Date.now() > token.expires_at) {
        this.deleteExpiredToken(loginResult.usu_id)
        token = await auth
          .use("api")
          .generate(loginResult, { expiresIn: "1 days" })
      }

      this.updateRememberUserToken(loginResult.usu_id,token.token)
      const valueToken = await usuController.getRememberToken(loginResult.usu_id)

      const results = {
        usu_num_doc: loginResult.usu_num_doc,
        rol_descripcion: loginResult.rol_descripcion,
        token:{
          type: "bearer",
          token: valueToken?.usu_token_remember,
          expires_at: token.expires_at
        }
      }

      api.setResult(results);
    } catch (error) {
      console.log(error);
      api.setState(404, "Error", "Credenciales incorrectas, intente de nuevo");
    } finally {
      return response.json(api.toResponse());
    }
  }

  private async verifyTokenExists(usu_id: number) {
    try {
      const tokenResult = await Database.from("api_tokens")
        .select("type", "token", "expires_at")
        .where("usu_id", "=", usu_id)
        .firstOrFail();

      const foundToken = {
        expires_at: tokenResult.expires_at,
      }
      return foundToken;
    } catch (error) {
      return null;
    }
  }

  private async updateRememberUserToken(usu_id: number, token: string){
    const usuControlador = new UsuariosController()
    try{
      const data = {usu_id: usu_id, usu_token_remember:token}
      await usuControlador.update(data)
    }catch(error){
      console.log("Error al actualizar el remember token");
    }
  }

  private async deleteExpiredToken(usu_id: number) {
    try {
      await Database.from("api_tokens")
        .where("usu_id", usu_id)
        .delete()
    } catch (error) {
      console.log(error)
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    const api = new Api();
    await auth.use("api").revoke();
    api.setResult({ revoked: true });
    return response.json(api.toResponse());
  }
}
