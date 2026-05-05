import { BadRequestException } from '@nestjs/common';
import { PedidoContext, PedidoState } from './pedido-state.interface';

export class PagadoState implements PedidoState {
  getNombre() {
    return 'PAGADO';
  }

  async confirmarPago(_pedido: PedidoContext) {
    throw new BadRequestException('El pedido ya se encuentra pagado.');
  }

  async cancelar(_pedido: PedidoContext) {
    throw new BadRequestException('No se puede cancelar un pedido que ya fue pagado.');
  }

  async expirar(_pedido: PedidoContext) {
    throw new BadRequestException('Un pedido pagado no puede expirar.');
  }
}