import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema} from '@ioc:Adonis/Core/Validator'
import Path from 'path'
import Api from 'App/Helpers/ResponseApi'
import Doc from 'App/Models/Documento/DocumentoModel'


export default class DocumentosController {

  public async uploadFile({request,response}:HttpContextContract){
    const api =  new Api()
    const ruta: string = Path.join(process.cwd(),"documents")
    const fileData = await request.validate({schema: schema.create({
      file: schema.file({
        size: '2mb',
        extnames: ['jpg','png','pdf']
      }),
    })})

    const results = await fileData.file.move(ruta)
    api.setResult(results)

    return response.json(api.toResponse())
  }


}
