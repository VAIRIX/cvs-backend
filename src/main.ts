import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { HttpExceptionFilter } from './utils/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'excludeAll',
    }),
  );
  app.useGlobalGuards(new JwtAuthGuard());

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

  const options = new DocumentBuilder()
    .setTitle('CV Backend API')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
  });
}
bootstrap();
