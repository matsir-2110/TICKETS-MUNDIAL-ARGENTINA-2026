import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PartidosService } from './partidos.service';

@Controller('partidos')
export class PartidosController {
    constructor(private readonly partidosService: PartidosService) {}

    @Get()
    async obtenerTodos() {
        return await this.partidosService.obtenerTodos();
    }

    @Get(':id')
    async obtenerPorId(@Param('id', ParseIntPipe) id: number) {
        return await this.partidosService.obtenerPorId(id);
    }
}