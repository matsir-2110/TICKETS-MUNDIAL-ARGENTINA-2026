import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita la validación automática de DTOs en toda la app
  // eslint-disable-next-line react-hooks/rules-of-hooks
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ignora campos que no están en el DTO
      forbidNonWhitelisted: true, // rechaza si vienen campos de más
      transform: true, // convierte los tipos automáticamente
    }),
  );

  // Habilitar CORS para permitir peticiones desde el frontend
  app.enableCors({
    origin: 'http://localhost:3000',
  });

  await app.listen(3001);
  console.log('Servidor corriendo en: http://localhost:3000');
}

void bootstrap();