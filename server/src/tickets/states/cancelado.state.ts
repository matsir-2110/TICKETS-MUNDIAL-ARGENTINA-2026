import { BadRequestException } from '@nestjs/common';
import { PedidoContext, PedidoState } from './pedido-state.interface';

export class CanceladoState implements PedidoState {
  getNombre() {
    return 'CANCELADO';
  }

  async confirmarPago(_pedido: PedidoContext) {
    throw new BadRequestException('No se puede pagar un pedido que ya fue cancelado.');
  }

  async cancelar(_pedido: PedidoContext) {
    throw new BadRequestException('El pedido ya se encuentra cancelado.');
  }

  async expirar(_pedido: PedidoContext) {
    throw new BadRequestException('Un pedido cancelado no puede expirar.');
  }
}