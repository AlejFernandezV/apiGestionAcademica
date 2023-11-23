import Usuario from 'App/Models/Usuario/UsuarioModel'
import UsuarioRol from 'App/Models/UsuarioRol/UsuarioRolModel'
export default class UsuariosController {

  public async showAll() {
    return await Usuario
    .query()
    .select('usu_email','usu_nombre','usu_apellido','usu_estudio')
    .orderBy('usu_id')
  }

  public async showAllNames(){
    return await Usuario
    .query()
    .select('usu_nombre','usu_apellido')
    .orderBy('usu_nombre')
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
    .select('usu_num_doc','usu_tipo_doc','usu_email','usu_nombre','usu_apellido','usu_genero','usu_estudio','usu_estado')

  }

  public async update(data: any) {
    try{
      const usuario = await Usuario.findOrFail(data.usu_id)
      return {code:200, "result":await usuario.merge(data).save()}
    }catch(error){
      return {code:404 ,"Error: ":error}
    }
  }

  public async destroy(parametros) {
    try{
      const queryBuilder = Usuario.query()

      for (const campo in parametros) {
        queryBuilder.where(`usu_${campo}`, 'LIKE', `${parametros[campo]}`);
      }

      return {code:200, "result": await queryBuilder.delete()}
    }catch(error){
      return {code:404 ,"Error: ":error}
    }
  }
}
