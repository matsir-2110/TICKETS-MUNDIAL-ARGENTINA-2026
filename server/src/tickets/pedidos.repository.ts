import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class PedidosRepository {
    constructor(private readonly supabaseService: SupabaseService) { }

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

    async actualizarEstadoPago(pedidoId: string, estado: string, referenciaPago: string) {
        const supabase = this.supabaseService.getClient();
        const { error } = await supabase
            .from('Pedidos')
            .update({
                estado_pago: estado,
                referencia_pago: referenciaPago
            })
            .eq('id', pedidoId);

        if (error) {
            console.error('Error al actualizar estado del pedido:', error);
            throw new InternalServerErrorException('Error al actualizar el pedido');
        }
    }
}