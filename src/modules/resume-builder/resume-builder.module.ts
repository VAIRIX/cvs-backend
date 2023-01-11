import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionalEntity } from 'src/entities';
import { GoogleModule } from 'src/modules/google/google.module';
import { ProfessionalsRepository } from 'src/repositories';
import { AttributesModule } from '../attributes/attributes.module';
import { ResumeBuilderController } from './resume-builder.controller';
import { ResumeBuilderService } from './resume-builder.service';

@Module({
  controllers: [ResumeBuilderController],
  providers: [ResumeBuilderService, ProfessionalsRepository],
  imports: [
    GoogleModule,
    AttributesModule,
    TypeOrmModule.forFeature([ProfessionalEntity]),
  ],
})
export class ResumeBuilderModule {}
