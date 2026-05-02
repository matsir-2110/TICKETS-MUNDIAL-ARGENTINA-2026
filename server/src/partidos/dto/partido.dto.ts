import { IsString, IsNumber, IsDateString, Min } from 'class-validator';

export class PartidoDto {
    @IsString()
    equipo_a: string;

    @IsString()
    equipo_b: string;

    @IsDateString()
    fecha: string;

    @IsNumber()
    @Min(0)
    precio_base: number;

    @IsNumber()
    @Min(0)
    stock_disponible: number;
}