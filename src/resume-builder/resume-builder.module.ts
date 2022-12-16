import { Module } from '@nestjs/common';
import { ResumeBuilderController } from './resume-builder.controller';
import { ResumeBuilderService } from './resume-builder.service';

@Module({
  controllers: [ResumeBuilderController],
  providers: [ResumeBuilderService],
})
export class ResumeBuilderModule {}
