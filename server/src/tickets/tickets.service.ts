import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PartidosRepository } from '../partidos/partidos.repository';
import { PedidosRepository } from './pedidos.repository';
import { TicketsRepository } from './tickets.repository';
import { MercadoPagoStrategy } from '../payments/MercadoPagoStrategy';
import { PaymentProcessor } from '../payments/PaymentProcessor';

@Injectable()
export class TicketsService {
    constructor(
        private readonly partidosRepo: PartidosRepository,
        private readonly pedidosRepo: PedidosRepository,
        private readonly ticketsRepo: TicketsRepository,
    ) { }

    async procesarCompra(partidoId: number, usuarioId: string, cantidadAComprar: number, sector: string) {

        if (cantidadAComprar < 1 || cantidadAComprar > 6) {
            throw new BadRequestException('Error: Solo se pueden adquirir entre 1 y 6 entradas por pedido.');
        }

        const partido = await this.partidosRepo.obtenerPorId(partidoId);
        if (!partido) {
            throw new BadRequestException('El partido seleccionado no se encuentra disponible.');
        }

        if (cantidadAComprar > partido.stock_disponible) {
            throw new BadRequestException(`Stock insuficiente. Solo quedan ${partido.stock_disponible} entradas disponibles.`);
        }

        const montoTotal = partido.precio_base * cantidadAComprar;

        try {
            const nuevoPedido = await this.pedidosRepo.crearPedido({
                usuario_id: usuarioId,
                monto_total: montoTotal,
                fecha_compra: new Date(),
                estado_pago: 'PENDIENTE',
                referencia_pago: null
            });

            const ticketsAGenerar = [];
            for (let i = 0; i < cantidadAComprar; i++) {
                ticketsAGenerar.push({
                    pedido_id: nuevoPedido.id,
                    partido_id: partido.id,
                    sector: sector
                });
            }

            await this.ticketsRepo.crearMultiplesTickets(ticketsAGenerar);

            const nuevoStock = partido.stock_disponible - cantidadAComprar;
            await this.partidosRepo.actualizarStock(partido.id, nuevoStock);

            const mpStrategy = new MercadoPagoStrategy();
            const processor = new PaymentProcessor(mpStrategy);
            const urlPago = await processor.processTicketPayment({
                productoId: String(partido.id),
                cantidad: cantidadAComprar,
                precio: partido.precio_base
            });

            return {
                exito: true,
                pedidoId: nuevoPedido.id,
                montoTotal: montoTotal,
                cantidad: cantidadAComprar,
                urlPago: urlPago,
                mensaje: 'Pedido generado correctamente. Completá el pago para asegurar tu lugar en el estadio.'
            };

        } catch (error) {
            throw new InternalServerErrorException('Ocurrió un error al procesar el pedido. Intente nuevamente.');
        }
    }

    async confirmarPago(pagoId: string) {
        try {
            const { MercadoPagoConfig, Payment } = await import('mercadopago');
            const client = new MercadoPagoConfig({
                accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!
            });
            const payment = new Payment(client);
            const resultado = await payment.get({ id: pagoId });

            if (resultado.status === 'approved') {
                await this.pedidosRepo.actualizarEstadoPago(
                    String(resultado.external_reference!),
                    'PAGADO',
                    pagoId
                );
            }
        } catch (error) {
            console.error('Error al confirmar pago:', error);
        }
    }
}