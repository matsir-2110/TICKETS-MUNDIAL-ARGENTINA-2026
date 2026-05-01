import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class PartidosRepository {
    constructor(private readonly supabaseService: SupabaseService) {}

    async obtenerTodos() {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('Partidos')
            .select('*');

        if (error) {
            console.error('Error al obtener partidos de Supabase:', error);
            return [];
        }

        return data;
    }

    async obtenerPorId(id: number) {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('Partidos')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error al obtener partido de Supabase:', error);
            return null;
        }

        return data;
    }

    async actualizarStock(id: number, nuevoStock: number) {
        const supabase = this.supabaseService.getClient();
        const { error } = await supabase
            .from('Partidos')
            .update({ stock_disponible: nuevoStock })
            .eq('id', id);

        if (error) {
            console.error('Error al actualizar stock en Supabase:', error);
            throw new InternalServerErrorException('Error al actualizar el stock del partido');
        }

        return true;
    }
}