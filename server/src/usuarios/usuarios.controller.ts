import { Controller, Post, Body } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { LoginDto, RegisterDto, ForgotPasswordDto } from './dto/usuario.dto';

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) { }

    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.usuariosService.login(dto);
    }

    @Post('register')
    register(@Body() dto: RegisterDto) {
        return this.usuariosService.register(dto);
    }

    @Post('forgot-password')
    forgotPassword(@Body() dto: ForgotPasswordDto) {
        return this.usuariosService.forgotPassword(dto);
    }
}