import { Module } from '@nestjs/common';
import { PartidosModule } from './partidos/partidos.module';
import { TicketsModule } from './tickets/tickets.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [PartidosModule, TicketsModule, UsuariosModule, SupabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
