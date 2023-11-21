import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema} from '@ioc:Adonis/Core/Validator'
import Path from 'path'
import Api from 'App/Helpers/ResponseApi'
import Doc from 'App/Models/Documento/DocumentoModel'


export default class DocumentosController {

  public async uploadFile({request,response}:HttpContextContract){
    const { usu_id, eva_id } = request.qs()

    const api =  new Api()
    const ruta: string = Path.join(process.cwd(),"documents")


    const fileData = await request.validate({schema: schema.create({
      file: schema.file({
        size: '2mb',
        extnames: ['jpg','png','pdf']
      }),
    })})

    const nombre:string = `${usu_id}_${eva_id}_${fileData.file.clientName}`

    await Doc.create({
      eva_id: eva_id,
      doc_nombre: nombre,
      doc_ruta: `${ruta}\\${nombre}`
    })
    const results = await fileData.file.move(ruta,{name:nombre})
    api.setResult(results)

    return response.json(api.toResponse())
  }
}
