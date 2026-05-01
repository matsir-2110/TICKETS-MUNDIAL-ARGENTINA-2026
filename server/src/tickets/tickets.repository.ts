import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class TicketsRepository {
    constructor(private readonly supabaseService: SupabaseService) {}

    async crearMultiplesTickets(tickets: any[]) {
        const supabase = this.supabaseService.getClient();
        const { error } = await supabase
            .from('Tickets')
            .insert(tickets);

        if (error) {
            console.error('Error al insertar tickets en Supabase:', error);
            throw new InternalServerErrorException('Error al generar los tickets en la base de datos');
        }

        return true;
    }
}