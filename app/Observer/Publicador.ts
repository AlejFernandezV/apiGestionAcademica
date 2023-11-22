export default class Publicador{
  private subscriptores: Subscriptor[] = [];
  private estado: string = "";

  agregarSubscriptor(subscriptor: Subscriptor): void {
    this.subscriptores.push(subscriptor);
  }

  eliminarSubscriptor(subscriptor: Subscriptor): void {
    this.subscriptores = this.subscriptores.filter(o => o !== subscriptor);
  }

  notificarSubscriptores(): void {
    this.subscriptores.forEach(subscriptor => {
      subscriptor.actualizar(this.estado);
    });
  }

  setEstado(nuevoEstado: string): void {
    this.estado = nuevoEstado;
    this.notificarSubscriptores();
  }
}
