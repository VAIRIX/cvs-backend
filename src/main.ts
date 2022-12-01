import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const defaultPort = 3000;
  const port = process.env.PORT || defaultPort;
  await app.listen(port);
}
bootstrap();
