import { Body, Controller, Post } from '@nestjs/common';
import { Req, Res } from 'src/dtos';
import { ResumeBuilderService } from './resume-builder.service';

@Controller('resumes')
export class ResumeBuilderController {
  constructor(private readonly resumeBuilderService: ResumeBuilderService) {}

  @Post()
  generateResume(
    @Body() buildResumeReqDto: Req.BuildResumeReqDto,
  ): Promise<Res.BuildResumeResDto> {
    return this.resumeBuilderService.generateResume(buildResumeReqDto);
  }
}
