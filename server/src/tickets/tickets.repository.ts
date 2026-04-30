import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketsRepository {
    async crearMultiplesTickets(tickets: any[]) {
        // aca despues tiene que ir el INSERT a Supabase en la tabla Tickets
        return true;
    }
}