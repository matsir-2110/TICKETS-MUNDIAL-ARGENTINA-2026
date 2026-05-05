import { PedidoContext, PedidoState } from './pedido-state.interface';
import { PagadoState } from './pagado.state';
import { CanceladoState } from './cancelado.state';
import { ExpiradoState } from './expirado.state';

export class PendienteState implements PedidoState {
  getNombre() {
    return 'PENDIENTE';
  }

  async confirmarPago(pedido: PedidoContext) {
    await pedido.setState(new PagadoState());
  }

  async cancelar(pedido: PedidoContext) {
    await pedido.setState(new CanceladoState());
  }

  async expirar(pedido: PedidoContext) {
    await pedido.setState(new ExpiradoState());
  }
}