import { Injectable } from '@nestjs/common';

@Injectable()
export class PedidosRepository {
    async crearPedido(datosPedido: any) {
        //aca tiene que ir el INSERT a supabase en la tabla pedidos
        return { id: 'uuid-pedido-falso-123' };
    }
}