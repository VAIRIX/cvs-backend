import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeedService } from './seed.service';
import { AttributeEntity, AttributeTypeEntity } from 'src/entities';
import {
  AttributeTypesRepository,
  AttributesRepository,
} from 'src/repositories';
import { ProfessionalsModule } from '../professionals/professionals.module';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AttributeTypeEntity, AttributeEntity]),
    ProfessionalsModule,
    ProjectsModule,
  ],
  providers: [SeedService, AttributeTypesRepository, AttributesRepository],
})
export class SeedModule {}
