import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class PedidosRepository {
    constructor(private readonly supabaseService: SupabaseService) {}

    async crearPedido(datosPedido: any) {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('Pedidos')
            .insert(datosPedido)
            .select()
            .single();

        if (error) {
            console.error('Error al crear pedido en Supabase:', error);
            throw new InternalServerErrorException('Error al registrar el pedido');
        }

        return data;
    }
}