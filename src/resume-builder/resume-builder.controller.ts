import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Req, Res } from 'src/dtos';
import { ResumeBuilderService } from './resume-builder.service';

@Controller('resumes')
@ApiBearerAuth()
@ApiTags('Resumes')
export class ResumeBuilderController {
  constructor(private readonly resumeBuilderService: ResumeBuilderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: Res.BuildResumeResDto })
  generateResume(
    @Body() buildResumeReqDto: Req.BuildResumeReqDto,
  ): Promise<Res.BuildResumeResDto> {
    return this.resumeBuilderService.generateResume(buildResumeReqDto);
  }
}
