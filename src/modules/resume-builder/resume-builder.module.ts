import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionalEntity } from 'src/entities';
import { GoogleModule } from 'src/modules/google/google.module';
import { ProfessionalsRepository } from 'src/repositories';
import { ResumeBuilderController } from './resume-builder.controller';
import { ResumeBuilderService } from './resume-builder.service';

@Module({
  controllers: [ResumeBuilderController],
  providers: [ResumeBuilderService, ProfessionalsRepository],
  imports: [GoogleModule, TypeOrmModule.forFeature([ProfessionalEntity])],
})
export class ResumeBuilderModule {}
