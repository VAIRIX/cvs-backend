import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionalEntity, ProfessionalsProjectsEntity } from 'src/entities';
import {
  ProfessionalAttributesRepository,
  ProfessionalsProjectsRepository,
  ProfessionalsRepository,
} from 'src/repositories';
import { AttributesModule } from '../attributes/attributes.module';
import { ProfessionalsController } from './professionals.controller';
import { ProfessionalsService } from './professionals.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfessionalEntity, ProfessionalsProjectsEntity]),
    AttributesModule,
  ],
  controllers: [ProfessionalsController],
  providers: [
    ProfessionalsService,
    ProfessionalsRepository,
    ProfessionalsProjectsRepository,
    ProfessionalAttributesRepository,
  ],
  exports: [ProfessionalsService],
})
export class ProfessionalsModule {}
