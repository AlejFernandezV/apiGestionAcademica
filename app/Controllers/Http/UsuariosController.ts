import Usuario from 'App/Models/Usuario/UsuarioModel'
import UsuarioRol from 'App/Models/UsuarioRol/UsuarioRolModel'
import Database from "@ioc:Adonis/Lucid/Database"
export default class UsuariosController {

  public async showAllForDean() {
    return await Database
    .from('usuario')
    .join('usuario_rol','usuario.usu_id','usuario_rol.usu_id')
    .select("usuario.usu_id",'usuario.usu_num_doc','usuario.usu_email','usuario.usu_nombre','usuario.usu_apellido','usuario.usu_genero','usuario.usu_estudio')
    .where('usuario_rol.rol_id','!=',6)
    .orderBy('usuario.usu_id')
  }

  public async showAllNamesForDean(){
    return await Database
    .from('usuario')
    .join('usuario_rol','usuario.usu_id','usuario_rol.usu_id')
    .select('usuario.usu_nombre','usuario.usu_apellido')
    .where('usuario_rol.rol_id','!=',6)
    .orderBy('usuario.usu_nombre')
  }

  public async showAllForCoordinator() {
    return await Database
    .from('usuario')
    .join('usuario_rol','usuario.usu_id','usuario_rol.usu_id')
    .select("usuario.usu_id",'usuario.usu_num_doc','usuario.usu_email','usuario.usu_nombre','usuario.usu_apellido','usuario.usu_genero','usuario.usu_estudio')
    .where('usuario_rol.rol_id','!=',5).andWhere('usuario_rol.rol_id','!=',6)
    .orderBy('usuario.usu_id')
  }

  public async showAllNamesForCoordinator(){
    return await Database
    .from('usuario')
    .join('usuario_rol','usuario.usu_id','usuario_rol.usu_id')
    .select('usuario.usu_nombre','usuario.usu_apellido')
    .where('usuario_rol.rol_id','!=',5).andWhere('usuario_rol.rol_id','!=',6)
    .orderBy('usuario.usu_nombre')
  }

  public async store(usuario: Usuario, usuario_rol: UsuarioRol) {
    const resultUsu = await Usuario.create(usuario)

    if(resultUsu!=null){
      await UsuarioRol.create({
        usu_id: resultUsu.usu_id,
        rol_id: usuario_rol.rol_id
      })
      return true
    }
    else{
      return false
    }
  }

  public async findByName(parametros: any) {
    const queryBuilder = Usuario.query()

    for (const campo in parametros) {
      queryBuilder.where(`usu_${campo}`, 'LIKE', `${parametros[campo]}`);
    }

    return await queryBuilder
    .select("usuario.usu_id",'usu_num_doc','usu_tipo_doc','usu_email','usu_nombre','usu_apellido','usu_genero','usu_estudio','usu_estado')
    .firstOrFail()
  }

  public async findByNumDoc(num_doc: any) {
    return await Usuario.query()
    .select("usuario.usu_id",'usu_num_doc','usu_tipo_doc','usu_email','usu_nombre','usu_apellido','usu_genero','usu_estudio','usu_estado')
    .where('usu_num_doc', num_doc)
    .firstOrFail()
  }

  public async updateByNumDoc(data: any) {
    try{
      const usuario = await Usuario.findByOrFail("usu_num_doc",data.usu_num_doc)
      const result =await usuario.merge(data).save()
      return {code:200, "result":result}
    }catch(error){
      return {code:404 ,"Error: ":error}
    }
  }

  public async getRememberToken(usu_id: number){
    try{
      const token = await Usuario
      .query()
      .select("usu_token_remember")
      .where("usu_id", usu_id)
      .firstOrFail()

      return token

    }catch(error){
      console.log("Error al obtener el token del usuario",error)
      return null
    }
  }

  public async destroyByNumDoc(usu_num_doc:number) {
    try{
      const usuario = await Usuario.findByOrFail("usu_num_doc",usu_num_doc)
      const result = await usuario.delete()
      return {code:200, "result": result}
    }catch(error){
      console.log(error);
      return {code:404 ,"Error: ":error}
    }
  }

  public async updateRememberToken(data:any){
    try{
      const usuario = await Usuario.findByOrFail("usu_num_doc",data.usu_num_doc)
      const result =await usuario.merge(data).save()
      return {code:200, "result":result}
    }catch(error){
      return {code:404 ,"Error: ":error}
    }
  }
}
