export interface TicketEventObserver {
  onPagoConfirmado(pedidoId: string, usuarioId: string, monto: number): Promise<void>;
  onPedidoCreado(pedidoId: string, usuarioId: string): Promise<void>;
}