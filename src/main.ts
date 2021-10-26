import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';
import { SERVER_PORT } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  initSwagger(app);
  await app.listen(parseInt(config.get<string>(SERVER_PORT), 10) || 3000);
}
bootstrap();
