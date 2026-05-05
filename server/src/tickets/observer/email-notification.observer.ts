import { Injectable } from '@nestjs/common';
import { TicketEventObserver } from './ticket-event.observer';

@Injectable()
export class EmailNotificationObserver implements TicketEventObserver {
  async onPagoConfirmado(pedidoId: string, usuarioId: string, monto: number) {
    console.log('Enviando email de confirmación al usuario ${usuarioId}, pedido ${pedidoId}');
  }

   async onPedidoCreado(pedidoId: string, usuarioId: string) {
    console.log('Email: pedido ${pedidoId} creado, esperando pago...');
  }
}