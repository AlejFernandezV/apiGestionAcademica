import NotificacionModel from "App/Models/Notificación/NotificacionModel";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Api from "App/Helpers/ResponseApi";

export default class NotificacionesController {

  public async listarNotificacionesUsuario({request,response}:HttpContextContract){
    const api = new Api()
    const usu_id = request.input("usu_id")

    const results = await Database
    .from('')
    .select("noti_id","usu_id","noti_content","noti_ruta","noti_estado")
    .where("usu_id",usu_id)

    if(results.length < 0){
      api.setState(404,"Error","No hay notificaciones para listar")
    }else{
      api.setResult(results)
    }
    return response.json(api.toResponse())
  }

  public async crearNotificacion({request,response}:HttpContextContract){
    const api = new Api()
    const data = request.only(["usu_id","noti_content","noti_ruta","noti_estado"])

    try{
      const result = await NotificacionModel.create(data)
      api.setResult(result)
    }catch(error){
      console.log();
      api.setState(404,"Error","Error al crear la notificación")
    }finally{
      return response.json(api.toResponse())
    }
  }

  public async actualizarNotificacion({request,response}:HttpContextContract){
    const api = new Api()
    const data = request.only(["noti_id","noti_estado"])

    try{
      const notificacion = await NotificacionModel.findByOrFail("noti_id",data.noti_id)
      const result = await notificacion.merge(data).save()
      api.setResult(result)
    }catch(error){
      console.log();
      api.setState(404,"Error","Error al actualizar la notificación")
    }finally{
      return response.json(api.toResponse())
    }
  }

  public async eliminarNotificacion({request,response}:HttpContextContract){
    const api = new Api()
    const noti_id = request.input("noti_id")
    try{
      const notificacion = await NotificacionModel.findByOrFail("noti_id",noti_id)
      const result = await notificacion.delete()
      api.setResult(result)
    }catch(error){
      console.log(error);
      api.setState(404,"Error", "Error al eliminar la notificación")
    }finally{
      return response.json(api.toResponse())
    }
  }
}
