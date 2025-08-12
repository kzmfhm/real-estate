


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strips any properties that are not in the DTO
    transform: true, // Automatically transforms payloads to DTO instances
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();