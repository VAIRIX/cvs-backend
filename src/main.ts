import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'excludeAll',
    }),
  );

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
