import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PartidosModule } from './partidos/partidos.module';
import { TicketsModule } from './tickets/tickets.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PartidosModule,
    TicketsModule,
    UsuariosModule,
    SupabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }