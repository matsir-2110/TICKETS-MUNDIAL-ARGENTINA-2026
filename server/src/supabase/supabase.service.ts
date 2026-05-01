import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly logger = new Logger(SupabaseService.name);
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      this.logger.warn('Faltan las credenciales de Supabase en el archivo .env. Asegúrate de configurarlas.');
    } else {
      this.supabase = createClient(supabaseUrl, supabaseKey);
      this.logger.log('Cliente de Supabase inicializado correctamente.');
    }
  }

  getClient(): SupabaseClient {
    if (!this.supabase) {
      throw new Error('El cliente de Supabase no se pudo inicializar por falta de credenciales.');
    }
    return this.supabase;
  }
}
