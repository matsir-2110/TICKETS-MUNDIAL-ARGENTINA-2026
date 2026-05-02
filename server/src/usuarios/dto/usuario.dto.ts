import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UsuarioDto {
    @IsString()
    Nombre: string;

    @IsString()
    Apellido: string;

    @IsEmail()
    Email: string;

    @IsString()
    @IsOptional()
    Documento?: string;

    @IsString()
    @IsOptional()
    Telefono?: string;

    @IsString()
    @IsOptional()
    Provincia?: string;

    @IsString()
    @IsOptional()
    Localidad?: string;
}