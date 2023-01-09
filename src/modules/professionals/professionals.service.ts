import { Injectable } from '@nestjs/common';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { plainToInstance } from 'class-transformer';
import { API_RESPONSE_MESSAGES } from 'src/constants';
import { Req, Res } from 'src/dtos';
import {
  ProfessionalsRepository,
  ProfessionalsProjectsRepository,
  ProfessionalAttributesRepository,
} from 'src/repositories';
import { helperCreatePaginatedResponse } from 'src/utils/api-paginated-response';
import { DataSource } from 'typeorm';
import { AttributesService } from '../attributes/attributes.service';

@Injectable()
export class ProfessionalsService {
  constructor(
    private readonly professionalsRepository: ProfessionalsRepository,
    private readonly professionalsProjectRepository: ProfessionalsProjectsRepository,
    private readonly professionalsAttributesRepository: ProfessionalAttributesRepository,
    private readonly attributesService: AttributesService,
    private readonly dataSource: DataSource,
  ) {}

  public async getProfessionals(
    professionalsFilterDto: Req.GetProfessionalsFilterDto,
  ): Promise<Res.PaginatedListDto<Res.ProfessionalResDto>> {
    const professionals = await this.professionalsRepository.getProfessionals(
      professionalsFilterDto,
    );

    return helperCreatePaginatedResponse<Res.ProfessionalResDto>(
      Res.ProfessionalResDto,
      professionals,
    );
  }

  public async getProfessionalById(
    id: string,
  ): Promise<Res.ProfessionalResDto> {
    const professional = await this.professionalsRepository.findOneOrFail({
      where: { id },
      relations: {
        projects: {
          project: true,
        },
        attributes: {
          attribute: true,
        },
      },
    });

    return plainToInstance(Res.ProfessionalResDto, professional);
  }

  public async createProfessional(
    professional: Req.CreateProfessionalDto,
  ): Promise<Res.ProfessionalResDto> {
    if (
      !(await this.attributesService.validateAttributesById(
        professional?.attributes?.map(({ attributeId }) => attributeId),
      ))
    )
      throw new ForbiddenException(
        API_RESPONSE_MESSAGES.ATTRIBUTES_ARRAY_NOT_FOUND,
      );

    const createdProfessional = await this.dataSource.transaction(
      async (entityManager) => {
        const professionalEntity =
          this.professionalsRepository.create(professional);
        const createdProfessional = await entityManager.save(
          professionalEntity,
        );

        if (professional.projects?.length > 0) {
          const projects =
            this.professionalsProjectRepository.createProfessionalProjectsEntities(
              professionalEntity.id,
              professional.projects,
            );

          await entityManager.save(projects);
        }

        if (professional.attributes?.length > 0) {
          const attributes =
            this.professionalsAttributesRepository.createProfessionalAttributeEntities(
              professionalEntity.id,
              professional.attributes,
            );

          await entityManager.save(attributes);
        }

        return createdProfessional;
      },
    );

    return this.getProfessionalById(createdProfessional.id);
  }

  public async updateProfessional(
    id: string,
    professionalReqDto: Req.CreateProfessionalDto,
  ): Promise<Res.ProfessionalResDto> {
    const { projects, attributes, ...professional } = professionalReqDto;

    if (
      !(await this.attributesService.validateAttributesById(
        attributes?.map(({ attributeId }) => attributeId),
      ))
    )
      throw new ForbiddenException(
        API_RESPONSE_MESSAGES.ATTRIBUTES_ARRAY_NOT_FOUND,
      );

    await this.professionalsRepository.update(id, { ...professional });

    await this.professionalsProjectRepository.updateProfessionalProjects(
      id,
      projects,
    );

    await this.professionalsAttributesRepository.updateProfessionalAttributes(
      id,
      attributes,
    );

    const updatedProfessional = await this.getProfessionalById(id);

    return plainToInstance(Res.ProfessionalResDto, updatedProfessional);
  }

  public async deleteProfessional(id: string): Promise<void> {
    const result = await this.professionalsRepository.softDelete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        API_RESPONSE_MESSAGES.ITEM_NOT_FOUND({ itemName: 'Professional', id }),
      );
    }
  }
}
