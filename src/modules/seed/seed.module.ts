import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeedService } from './seed.service';
import {
  ProfessionalEntity,
  ProfessionalsProjectsEntity,
  ProjectEntity,
  TechnologyEntity,
} from 'src/entities';
import {
  ProfessionalsRepository,
  ProjectsRepository,
  ProfessionalsProjectsRepository,
  TechnologiesRepository,
} from 'src/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProfessionalEntity,
      ProjectEntity,
      ProfessionalsProjectsEntity,
      TechnologyEntity,
    ]),
  ],
  providers: [
    SeedService,
    ProfessionalsRepository,
    ProjectsRepository,
    ProfessionalsProjectsRepository,
    TechnologiesRepository,
  ],
})
export class SeedModule {}
