import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import Joi from 'joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [],
      validationSchema: Joi.object({}),
    }),
  ],
})
export class ConfigModule {}
