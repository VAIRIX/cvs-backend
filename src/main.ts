import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const defaultPort = 3000;
  const port = process.env.APP_PORT || defaultPort;

  const whitelist = process.env.CORS_DOMAINS?.startsWith('*')
    ? process.env.CORS_DOMAINS
    : process.env.CORS_DOMAINS?.split(',');

  app.enableCors({
    allowedHeaders: '*',
    origin: whitelist,
    methods: '*',
    credentials: true,
  });

  await app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
  });
}
bootstrap();
