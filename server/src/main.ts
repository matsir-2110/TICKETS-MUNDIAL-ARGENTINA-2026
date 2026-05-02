import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilitar CORS para permitir peticiones desde el frontend
  app.enableCors({
    origin: 'http://localhost:3000'
  });
  // El backend escuchará en el puerto 3000
  await app.listen(3001);
  console.log('Servidor corriendo en: http://localhost:3000');
}
bootstrap();
