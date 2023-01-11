import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionalsProjectsEntity, ProjectEntity } from 'src/entities';
import {
  ProfessionalsProjectsRepository,
  ProjectsRepository,
  ProjectAttributesRepository,
} from 'src/repositories';
import { AttributesModule } from '../attributes/attributes.module';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity, ProfessionalsProjectsEntity]),
    AttributesModule,
  ],
  controllers: [ProjectsController],
  providers: [
    ProjectsService,
    ProjectsRepository,
    ProfessionalsProjectsRepository,
    ProjectAttributesRepository,
  ],
  exports: [ProjectsService],
})
export class ProjectsModule {}
