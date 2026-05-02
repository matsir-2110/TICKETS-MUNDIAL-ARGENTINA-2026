import { IsNumber, IsString, IsUUID, Min, Max } from 'class-validator';

export class ComprarTicketsDto {
    @IsNumber()
    partidoId: number;

    @IsString()
    @IsUUID()
    usuarioId: string;

    @IsNumber()
    @Min(1)
    @Max(6)
    cantidad: number;

    @IsString()
    sector: string;
}