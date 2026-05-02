import { Controller, Post, Body } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { ComprarTicketsDto } from './dto/comprar-tickets.dto';

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
}
