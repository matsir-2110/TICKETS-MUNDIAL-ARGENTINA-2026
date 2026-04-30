import { Module } from '@nestjs/common';
import { PartidosController } from './partidos.controller';
import { PartidosService } from './partidos.service';
import { PartidosRepository } from './partidos.repository';

@Module({
    controllers: [PartidosController],
    providers: [PartidosService, PartidosRepository],
    exports: [PartidosRepository, PartidosService]
})
export class PartidosModule { }