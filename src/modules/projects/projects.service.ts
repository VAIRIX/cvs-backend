import { Injectable } from '@nestjs/common';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { plainToInstance } from 'class-transformer';
import { API_RESPONSE_MESSAGES } from 'src/constants';
import { Req, Res } from 'src/dtos';
import {
  ProfessionalsProjectsRepository,
  ProjectsRepository,
  ProjectAttributesRepository,
} from 'src/repositories';
import {
  isSameOrAfter,
  isSameOrBefore,
  helperCreatePaginatedResponse,
} from 'src/utils';
import { DataSource } from 'typeorm';
import { AttributesService } from '../attributes/attributes.service';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly projectsRepository: ProjectsRepository,
    private readonly professionalsProjectRepository: ProfessionalsProjectsRepository,
    private readonly projectAttributesRepository: ProjectAttributesRepository,
    private readonly attributesService: AttributesService,
    private readonly dataSource: DataSource,
  ) {}

  public async getProjects(
    projectsFilterDto: Req.GetProjectsFilterDto,
  ): Promise<Res.PaginatedListDto<Res.ProjectResDto>> {
    const projects = await this.projectsRepository.getProjects(
      projectsFilterDto,
    );

    return helperCreatePaginatedResponse<Res.ProjectResDto>(
      Res.ProjectResDto,
      projects,
    );
  }

  public async getProjectById(id: string): Promise<Res.ProjectResDto> {
    const project = await this.projectsRepository.findOneOrFail({
      where: { id },
      relations: {
        professionals: { professional: true },
        attributes: { attribute: true },
      },
    });

    return plainToInstance(Res.ProjectResDto, project);
  }

  public async createProject(
    project: Req.CreateProjectDto,
  ): Promise<Res.ProjectResDto> {
    if (!this.validateDates(project))
      throw new ForbiddenException(
        API_RESPONSE_MESSAGES.ATTRIBUTE_INVALID_DATES,
      );

    if (
      !(await this.attributesService.validateAttributesById(
        project?.attributes?.map(({ attributeId }) => attributeId),
      ))
    )
      throw new ForbiddenException(
        API_RESPONSE_MESSAGES.ATTRIBUTES_ARRAY_NOT_FOUND,
      );

    const createdProject = await this.dataSource.transaction(
      async (entityManager) => {
        const projectEntity = this.projectsRepository.create(project);
        const createdProject = await entityManager.save(projectEntity);

        if (project.professionals?.length > 0) {
          const professionals =
            this.professionalsProjectRepository.createProjectProfessionalsEntities(
              projectEntity.id,
              project.professionals,
            );

          await entityManager.save(professionals);
        }

        if (project.attributes?.length > 0) {
          const attributes =
            this.projectAttributesRepository.createProjectAttributeEntities(
              projectEntity.id,
              project.attributes,
            );

          await entityManager.save(attributes);
        }
        return createdProject;
      },
    );

    return await this.getProjectById(createdProject.id);
  }

  public async updateProject(
    id: string,
    projectReqDto: Req.CreateProjectDto,
  ): Promise<Res.ProjectResDto> {
    if (!this.validateDates(projectReqDto))
      throw new ForbiddenException(
        API_RESPONSE_MESSAGES.ATTRIBUTE_INVALID_DATES,
      );

    if (
      !(await this.attributesService.validateAttributesById(
        projectReqDto?.attributes?.map(({ attributeId }) => attributeId),
      ))
    )
      throw new ForbiddenException(
        API_RESPONSE_MESSAGES.ATTRIBUTES_ARRAY_NOT_FOUND,
      );

    // TODO: Check if project exists before trying to update
    const { professionals, attributes, ...project } = projectReqDto;
    await this.projectsRepository.update(id, { ...project });

    await this.professionalsProjectRepository.updateProjectProfessionals(
      id,
      professionals,
    );

    await this.projectAttributesRepository.updateProjectAttributes(
      id,
      attributes,
    );

    const updatedProject = await this.getProjectById(id);

    return plainToInstance(Res.ProjectResDto, updatedProject);
  }

  public async deleteProject(id: string): Promise<void> {
    const result = await this.projectsRepository.softDelete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        API_RESPONSE_MESSAGES.ITEM_NOT_FOUND({ itemName: 'Project', id }),
      );
    }
  }

  private validateDates = (project: Req.CreateProjectDto) => {
    const validDateAttributes = project?.attributes?.filter(
      (attribute) =>
        isSameOrBefore(project.from, attribute.from) &&
        isSameOrAfter(project.to, attribute.to),
    );

    return project?.attributes?.length === validDateAttributes?.length;
  };
}
