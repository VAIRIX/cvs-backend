import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigModule } from './config/config.module';
import databaseConfig from './config/database.config';
import { ProfessionalsModule } from './modules/professionals/professionals.module';
import { AppService } from './app.service';
import { AdminEntity } from './entities';
import { ResumeBuilderModule } from './modules/resume-builder/resume-builder.module';
import { GoogleModule } from './modules/google/google.module';
import { AdminsRepository } from 'src/repositories';
import { ProjectsModule } from './modules/projects/projects.module';
import { AuthModule } from './modules/auth/auth.module';
import { SeedModule } from './modules/seed/seed.module';
import { AttributesModule } from './modules/attributes/attributes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity]),
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: (dbConfig: ConfigType<typeof databaseConfig>): object => ({
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
    AttributesModule,
    ProfessionalsModule,
    ProjectsModule,
    ResumeBuilderModule,
    GoogleModule,
    SeedModule,
  ],
  providers: [AppService, AdminsRepository],
})
export class AppModule {}
