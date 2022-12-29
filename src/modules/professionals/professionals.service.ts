import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { plainToInstance } from 'class-transformer';
import { Req, Res } from 'src/dtos';
import {
  ProfessionalsRepository,
  ProfessionalsProjectsRepository,
} from 'src/repositories';
import { DataSource } from 'typeorm';

@Injectable()
export class ProfessionalsService {
  constructor(
    private readonly professionalsRepository: ProfessionalsRepository,
    private readonly professionalsProjectRepository: ProfessionalsProjectsRepository,
    private readonly dataSource: DataSource,
  ) {}

  public async getProfessionals(
    professionalsFilterDto: Req.GetProfessionalsFilterDto,
  ): Promise<Res.ProfessionalResDto[]> {
    const professionals = await this.professionalsRepository.getProfessionals(
      professionalsFilterDto,
    );

    return professionals.map((professional) =>
      plainToInstance(Res.ProfessionalResDto, professional),
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
      },
    });

    return plainToInstance(Res.ProfessionalResDto, professional);
  }

  public async createProfessional(
    professional: Req.CreateProfessionalDto,
  ): Promise<Res.ProfessionalResDto> {
    return this.dataSource.transaction(async (entityManager) => {
      const professionalEntity =
        this.professionalsRepository.create(professional);
      const createdProfessional = await entityManager.save(professionalEntity);

      if (professional.projects?.length > 0) {
        const projects =
          this.professionalsProjectRepository.createProfessionalProjectsEntities(
            professionalEntity.id,
            professional.projects,
          );

        await entityManager.save(projects);
      }

      return plainToInstance(Res.ProfessionalResDto, createdProfessional);
    });
  }

  public async updateProfessional(
    id: string,
    professionalReqDto: Req.CreateProfessionalDto,
  ): Promise<Res.ProfessionalResDto> {
    const { projects, ...professional } = professionalReqDto;
    await this.professionalsRepository.update(id, { ...professional });

    await this.professionalsProjectRepository.updateProfessionalProjects(
      id,
      projects,
    );

    const updatedProfessional = await this.getProfessionalById(id);

    return plainToInstance(Res.ProfessionalResDto, updatedProfessional);
  }

  public async deleteProfessional(id: string): Promise<void> {
    const result = await this.professionalsRepository.softDelete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Professional with ID "${id}" was not found`);
    }
  }
}
