import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigModule } from './config/config.module';
import databaseConfig from './config/database.config';
import { ProfessionalsModule } from './professionals/professionals.module';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { AdminEntity } from './entities';
import { ResumeBuilderModule } from './resume-builder/resume-builder.module';
import { GoogleModule } from './google/google.module';
import { AdminsRepository } from 'src/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity]),
    ConfigModule,
    ProfessionalsModule,
    TypeOrmModule.forRootAsync({
      useFactory: async (
        dbConfig: ConfigType<typeof databaseConfig>,
      ): Promise<object> => ({
        type: dbConfig.client,
        host: dbConfig.host,
        port: dbConfig.port,
        username: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.dbname,
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: true, // TODO: Remove this in production and configure migrations
      }),
      inject: [databaseConfig.KEY],
    }),
    AuthModule,
    ResumeBuilderModule,
    GoogleModule,
  ],
  providers: [AppService, AdminsRepository],
})
export class AppModule {}
