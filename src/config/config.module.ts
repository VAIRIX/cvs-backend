import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import Joi from 'joi';
import authConfig from './auth.config';
import databaseConfig from './database.config';
import googleConfig from './google.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: [
        `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`,
      ],
      isGlobal: true,
      load: [databaseConfig, authConfig, googleConfig],
      validationSchema: Joi.object({
        APP_PORT: Joi.number().default(3000),
      }),
    }),
  ],
})
export class ConfigModule {}
