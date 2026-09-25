import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module.js';
import type { Environment } from './config/environment.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService<Environment, true>);
  const port = config.get('PORT', { infer: true });
  const apiPrefix = config.get('API_PREFIX', { infer: true });
  const allowedOrigins = config
    .get('CORS_ORIGINS', { infer: true })
    .split(',')
    .map((origin) => origin.trim());

  app.setGlobalPrefix(apiPrefix);
  app.enableCors({ origin: allowedOrigins, credentials: true });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('ZdaKids API')
    .setDescription('REST API for the ZdaKids learning platform')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, '0.0.0.0');
}
await bootstrap();
