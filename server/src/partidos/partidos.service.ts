import { Injectable } from '@nestjs/common';
import { PartidosRepository } from './partidos.repository';

@Injectable()
export class PartidosService {
    constructor(private readonly partidosRepo: PartidosRepository) {}

    async obtenerTodos() {
        return await this.partidosRepo.obtenerTodos();
    }

    async obtenerPorId(id: number) {
        return await this.partidosRepo.obtenerPorId(id);
    }
}