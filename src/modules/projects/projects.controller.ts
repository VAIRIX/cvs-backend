import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Req, Res } from 'src/dtos';
import { ProjectsService } from './projects.service';

@Controller('projects')
@ApiBearerAuth()
@ApiTags('Projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Res.ProjectResDto, isArray: true })
  public getProjects(
    @Query() projectsFilterDto: Req.GetProjectsFilterDto,
  ): Promise<Res.ProjectResDto[]> {
    return this.projectsService.getProjects(projectsFilterDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Res.ProjectResDto })
  public getProjectById(@Param('id') id: string): Promise<Res.ProjectResDto> {
    return this.projectsService.getProjectById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: Res.ProjectResDto })
  public createProject(
    @Body() project: Req.CreateProjectDto,
  ): Promise<Res.ProjectResDto> {
    return this.projectsService.createProject(project);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Res.ProjectResDto })
  public updateProject(
    @Param('id') id: string,
    @Body() project: Req.CreateProjectDto,
  ): Promise<Res.ProjectResDto> {
    return this.projectsService.updateProject(id, project);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public delete(@Param('id') id: string): Promise<void> {
    return this.projectsService.deleteProject(id);
  }
}
