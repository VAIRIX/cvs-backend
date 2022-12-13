import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionalEntity } from 'src/entities';
import { ProfessionalsRepository } from 'src/repositories/professionals.repository';
import { ProfessionalsController } from './professionals.controller';
import { ProfessionalsService } from './professionals.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfessionalEntity])],
  controllers: [ProfessionalsController],
  providers: [ProfessionalsService, ProfessionalsRepository],
})
export class ProfessionalsModule {}
