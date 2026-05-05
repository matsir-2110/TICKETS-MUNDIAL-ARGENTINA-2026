import { Injectable } from '@nestjs/common';
import { TicketEventObserver } from './ticket-event.observer';

@Injectable()
export class AuditLogObserver implements TicketEventObserver {
  async onPagoConfirmado(pedidoId: string, usuarioId: string, monto: number) {
    console.log(`Audit: pago confirmado - pedido ${pedidoId}, monto ${monto}`);
  }

  async onPedidoCreado(pedidoId: string, usuarioId: string) {
    console.log(`Audit: nuevo pedido ${pedidoId} por usuario ${usuarioId}`);
  }
}