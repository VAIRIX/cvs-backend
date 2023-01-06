import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionalsProjectsEntity, ProjectEntity } from 'src/entities';
import {
  ProfessionalsProjectsRepository,
  ProjectsRepository,
} from 'src/repositories';
import { ProjectAttributesRepository } from 'src/repositories/project-attributes.repository';
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
})
export class ProjectsModule {}
