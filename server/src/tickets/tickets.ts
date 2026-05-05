import { PedidoContext, PedidoState } from './states/pedido-state.interface';
import { PendienteState } from './states/pendiente.state';

export class Ticket implements PedidoContext {
  // Aca tendrian que ir las propiedades de tu base de datos para el ticket, por ejemplo:
  // id: string;
  // usuarioId: string;
  // precio: number;

  // estado actual en memoria
  private state: PedidoState;

  constructor() {
    // todo ticket nuevo arranca por defecto en estado PENDIENTE
    this.state = new PendienteState();
  }

  // Metodo para que los estados puedan cambiarse a si mismos
  async setState(state: PedidoState): Promise<void> {
    this.state = state;
  }

  

  async confirmarPago(): Promise<void> {
    await this.state.confirmarPago(this);
  }

  async cancelar(): Promise<void> {
    await this.state.cancelar(this);
  }

  async expirar(): Promise<void> {
    await this.state.expirar(this);
  }

  // Utilidad para obtener el nombre del estado en texto (ej: 'PENDIENTE', 'PAGADO')
  getEstadoActual(): string {
    return this.state.getNombre();
  }

  // Utilidad para reconstruir el objeto cuando se trae de la base de datos
  restaurarEstado(estadoRecuperado: PedidoState): void {
    this.state = estadoRecuperado;
  }
}