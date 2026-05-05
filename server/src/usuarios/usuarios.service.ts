import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { LoginDto, RegisterDto, ForgotPasswordDto } from './dto/usuario.dto';

@Injectable()
export class UsuariosService {
    // Usamos el SERVICE_ROLE para tener permisos de administración en el backend
    private supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    async login(dto: LoginDto) {
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email: dto.email,
            password: dto.password,
        });

        // Si hay error, Supabase ya nos dice si es por falta de confirmación o datos mal puestos
        if (error) {
            throw new UnauthorizedException('Email o contraseña incorrectos.');
        }

        return {
            session: data.session,
            user: data.user
        };
    }

    async register(dto: RegisterDto) {
        const { data, error } = await this.supabase.auth.signUp({
            email: dto.email,
            password: dto.password,
            options: {
                data: { full_name: dto.full_name }
            },
        });

        if (error) throw new BadRequestException(error.message);

        return {
            message: 'Cuenta creada con éxito. Por favor, verificá tu correo electrónico.'
        };
    }

    async forgotPassword(dto: ForgotPasswordDto) {
        const { error } = await this.supabase.auth.resetPasswordForEmail(dto.email, {
            redirectTo: 'http://localhost:3000/reset-password', // Ajusta a tu URL de front
        });

        if (error) throw new BadRequestException(error.message);

        return { message: 'Se ha enviado un correo para restablecer tu contraseña.' };
    }
}