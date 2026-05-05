import { BadRequestException } from '@nestjs/common';
import { PedidoContext, PedidoState } from './pedido-state.interface';

export class ExpiradoState implements PedidoState {
  getNombre() {
    return 'EXPIRADO';
  }

  async confirmarPago(_pedido: PedidoContext) {
    throw new BadRequestException('No se puede pagar un pedido que ya ha expirado.');
  }

  async cancelar(_pedido: PedidoContext) {
    throw new BadRequestException('Un pedido expirado no se puede cancelar porque ya está inactivo.');
  }

  async expirar(_pedido: PedidoContext) {
    throw new BadRequestException('El pedido ya se encuentra expirado.');
  }
}