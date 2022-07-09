import { NestFactory } from '@nestjs/core';
import { config } from 'aws-sdk';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  config.update({
    credentials: {
      secretAccessKey: process.env.SECRET_KEY,
      accessKeyId: process.env.ACCESS_KEY,
    },
  });

  app.enableCors();

  await app.listen(process.env.port || 3000);
}
bootstrap();
