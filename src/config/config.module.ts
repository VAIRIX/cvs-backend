import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import Joi from 'joi';
import authConfig from './auth.config';
import databaseConfig from './database.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig],
      validationSchema: Joi.object({
        APP_PORT: Joi.number().default(3000),
      }),
    }),
  ],
})
export class ConfigModule {}
