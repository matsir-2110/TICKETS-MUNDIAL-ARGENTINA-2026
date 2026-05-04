import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { ComprarTicketsDto } from './dto/comprar-tickets.dto';
import { PaymentProcessor } from '../payments/PaymentProcessor';
import { MercadoPagoStrategy } from '../payments/MercadoPagoStrategy';

@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) { }

    @Post('comprar')
    async comprarTickets(@Body() body: ComprarTicketsDto) {
        return await this.ticketsService.procesarCompra(
            body.partidoId,
            body.usuarioId,
            body.cantidad,
            body.sector
        );
    }

    @Post('checkout')
    async crearCheckout(@Body() datosCompra: any) {
        const mpStrategy = new MercadoPagoStrategy();
        const processor = new PaymentProcessor(mpStrategy);

        try {
            const urlPago = await processor.processTicketPayment(datosCompra);
            return { url: urlPago };
        } catch (error) {
            throw new HttpException('Falló la generación del checkout', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('webhook/mercadopago')
    async webhookMercadoPago(@Body() body: any) {
        if (body.type === 'payment' && body.data?.id) {
            await this.ticketsService.confirmarPago(body.data.id);
        }
        return { ok: true };
    }
}