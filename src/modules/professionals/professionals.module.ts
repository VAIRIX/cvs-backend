import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionalEntity, ProfessionalsProjectsEntity } from 'src/entities';
import {
  ProfessionalsProjectsRepository,
  ProfessionalsRepository,
} from 'src/repositories';
import { ProfessionalsController } from './professionals.controller';
import { ProfessionalsService } from './professionals.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfessionalEntity, ProfessionalsProjectsEntity]),
  ],
  controllers: [ProfessionalsController],
  providers: [
    ProfessionalsService,
    ProfessionalsRepository,
    ProfessionalsProjectsRepository,
  ],
})
export class ProfessionalsModule {}
