export interface PedidoState {
  confirmarPago(pedido: PedidoContext): Promise<void>;
  cancelar(pedido: PedidoContext): Promise<void>;
  expirar(pedido: PedidoContext): Promise<void>;
  getNombre(): string;
}

export interface PedidoContext {
  setState(state: PedidoState): Promise<void>;
}