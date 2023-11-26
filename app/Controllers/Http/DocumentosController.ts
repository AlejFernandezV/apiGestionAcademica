import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Path from 'path'
import Api from 'App/Helpers/ResponseApi'
import Doc from 'App/Models/Documento/DocumentoModel'

export default class DocumentosController {
  public async uploadFiles({ request, response }: HttpContextContract) {
    const usu_num_doc = request.input("num_doc")
    const eva_id = request.input("eva_id")

    const api = new Api()
    const ruta: string = Path.join(process.cwd(), "documents")

    try{
      const filesData = await request.validate({
        schema: schema.create({
          files: schema.array().members(
            schema.file({
              size: '5mb',
              extnames: ['jpg', 'png', 'pdf', 'zip', 'rar'],
            })
          ),
        }),
      })

      for (const fileData of filesData.files) {
        const nombre: string = `${usu_num_doc}_${eva_id}_${fileData.clientName}`

        await Doc.create({
          eva_id: eva_id,
          doc_nombre: nombre,
          doc_ruta: `${ruta}\\${nombre}`,
        })
        await fileData.move(ruta, { name: nombre })
      }

      api.setResult("Archivos subidos con éxito")

    }catch(error){
      console.log(error)
      if (error.messages && error.messages.errors) {
        console.log("Validation errors:", error.messages.errors)
      }
      api.setState(404,"Error","Error al guardar los archivos en el servidor")
    }finally{
      return response.json(api.toResponse())
    }
  }
}
