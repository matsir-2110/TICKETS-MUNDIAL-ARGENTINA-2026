import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PartidosRepository } from '../partidos/partidos.repository';
import { PedidosRepository } from './pedidos.repository';
import { TicketsRepository } from './tickets.repository';

@Injectable()
export class TicketsService {
    constructor(
        private readonly partidosRepo: PartidosRepository,
        private readonly pedidosRepo: PedidosRepository,
        private readonly ticketsRepo: TicketsRepository,
    ) { }

    async procesarCompra(partidoId: number, usuarioId: string, cantidadAComprar: number) {

        // te permite comprar hasta 6 entradas nms
        if (cantidadAComprar < 1 || cantidadAComprar > 6) {
            throw new BadRequestException('Error: Solo se pueden adquirir entre 1 y 6 entradas por pedido.');
        }

        // traer datos del partido usando el repositorio
        const partido = await this.partidosRepo.obtenerPorId(partidoId);
        if (!partido) {
            throw new BadRequestException('El partido seleccionado no se encuentra disponible.');
        }

        // verificar disponibilidad de stock
        if (cantidadAComprar > partido.stock_disponible) {
            throw new BadRequestException(`Stock insuficiente. Solo quedan ${partido.stock_disponible} entradas disponibles.`);
        }

        // calcular el monto total de la operación
        const montoTotal = partido.precio_base * cantidadAComprar;

        // crear el pedido en la base de datos
        try {
            const nuevoPedido = await this.pedidosRepo.crearPedido({
                usuario_id: usuarioId,
                monto_total: montoTotal,
                fecha_compra: new Date(),
                estado_pago: 'PENDIENTE',
                referencia_pago: null
            });

            // crear los tickets
            const ticketsAGenerar = [];
            for (let i = 0; i < cantidadAComprar; i++) {
                ticketsAGenerar.push({
                    pedido_id: nuevoPedido.id,
                    partido_id: partido.id,
                    sector: 'General'
                });
            }


            await this.ticketsRepo.crearMultiplesTickets(ticketsAGenerar);

            // actualizar stock, descontando el stock del partido
            const nuevoStock = partido.stock_disponible - cantidadAComprar;
            await this.partidosRepo.actualizarStock(partido.id, nuevoStock);

            //retornar el resumen
            return {
                exito: true,
                pedidoId: nuevoPedido.id,
                montoTotal: montoTotal,
                cantidad: cantidadAComprar,
                mensaje: 'Pedido generado correctamente. Completá el pago para asegurar tu lugar en el estadio.'
            };

        } catch (error) {
            throw new InternalServerErrorException('Ocurrió un error al procesar el pedido. Intente nuevamente.');
        }
    }
}