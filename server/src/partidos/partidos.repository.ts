import { Injectable } from '@nestjs/common';

@Injectable()
export class PartidosRepository {
    async obtenerPorId(id: number) {
        // dato temporal para que el servicio no tire error
        // despues aca tiene que ir el SELECT a Supabase
        return {
            id: id,
            precio_base: 50,
            stock_disponible: 100
        };
    }

    async actualizarStock(id: number, nuevoStock: number) {
        // aca tiene que ir el UPDATE a supabase
        return true;
    }
}