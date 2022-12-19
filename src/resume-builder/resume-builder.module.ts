import { Module } from '@nestjs/common';
import { GoogleModule } from 'src/google/google.module';
import { ResumeBuilderController } from './resume-builder.controller';
import { ResumeBuilderService } from './resume-builder.service';

@Module({
  controllers: [ResumeBuilderController],
  providers: [ResumeBuilderService],
  imports: [GoogleModule],
})
export class ResumeBuilderModule {}
