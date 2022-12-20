import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import Joi from 'joi';
import authConfig from './auth.config';
import databaseConfig from './database.config';
import googleConfig from './google.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/src/config/env/${
        process.env.NODE_ENV
      }.env`,
      load: [databaseConfig, authConfig, googleConfig],
      validationSchema: Joi.object({
        APP_PORT: Joi.number().default(3000),
      }),
    }),
  ],
})
export class ConfigModule {}
