import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionalsProjectsEntity, ProjectEntity } from 'src/entities';
import {
  ProfessionalsProjectsRepository,
  ProjectsRepository,
} from 'src/repositories';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity, ProfessionalsProjectsEntity]),
  ],
  controllers: [ProjectsController],
  providers: [
    ProjectsService,
    ProjectsRepository,
    ProfessionalsProjectsRepository,
  ],
})
export class ProjectsModule {}
