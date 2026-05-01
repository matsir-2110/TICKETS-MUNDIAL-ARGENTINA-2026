import { Controller, Post, Body } from '@nestjs/common';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}

    @Post('comprar')
    async comprarTickets(
        @Body('partidoId') partidoId: number,
        @Body('usuarioId') usuarioId: string,
        @Body('cantidad') cantidad: number
    ) {
        return await this.ticketsService.procesarCompra(partidoId, usuarioId, cantidad);
    }
}