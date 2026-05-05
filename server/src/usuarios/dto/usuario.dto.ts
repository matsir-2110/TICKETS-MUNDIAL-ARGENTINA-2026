import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class LoginDto {
    @IsEmail({}, { message: 'El email no tiene un formato válido.' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
    password: string;
}

export class RegisterDto {
    @IsString()
    @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres.' })
    full_name: string;

    @IsEmail({}, { message: 'El email no tiene un formato válido.' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
    @Matches(/[A-Z]/, { message: 'La contraseña debe tener al menos una mayúscula.' })
    password: string;
}

export class ForgotPasswordDto {
    @IsEmail({}, { message: 'El email no tiene un formato válido.' })
    email: string;
}