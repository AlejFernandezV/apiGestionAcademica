import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import Path from 'path'
import Api from 'App/Helpers/ResponseApi'
import Doc from 'App/Models/Documento/DocumentoModel'


export default class DocumentosController {

  public async uploadFile({request,response}:HttpContextContract){

    const data = request.only(['usu_nombre','eva_id','file'])
    const api =  new Api()
    const file = data.file('file', {
      size: '2mb',
      extnames: ['pdf','jpg', 'png'],
    })

    if (!file) {
      api.setState(404,"Error","No se recibió ningún archivo")
    }
    if (!file.isValid) {
      api.setState(404,"Error","El archivo no es válido, la extención no es válida")
    }else{

      const nombreDoc: string = `${data.usu_nombre}_${data.eva_id}`
      const ruta: string = Path.join(process.cwd(),"documents")

      const results = await file.move(ruta,{
        name: nombreDoc
      })

      await Doc.create({
        eva_id: data.eva_id,
        doc_nombre: nombreDoc,
        doc_ruta: ruta
      })
      api.setResult(results)
    }
    return response.json(api.toResponse())
  }


}
