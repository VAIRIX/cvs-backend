import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Req } from 'src/dtos';
import { ProfessionalEntity } from 'src/entities';
import { ProfessionalsRepository } from '../repositories/professionals.repository';

@Injectable()
export class ProfessionalsService {
  constructor(private professionalsRepository: ProfessionalsRepository) {}

  public async getProfessionals(
    professionalsFilterDto: Req.GetProfessionalsFilterDto,
  ): Promise<ProfessionalEntity[]> {
    return this.professionalsRepository.getProfessionals(
      professionalsFilterDto,
    );
  }

  public async getProfessionalById(id: string): Promise<ProfessionalEntity> {
    const professional = await this.professionalsRepository.findOneBy({ id });

    if (!professional) {
      throw new NotFoundException(`Professional with ID "${id}" not found`);
    }

    return professional;
  }

  public async createProfessional(
    professional: Req.CreateProfessionalDto,
  ): Promise<ProfessionalEntity> {
    return this.professionalsRepository.createProfessional(professional);
  }

  public async updateProfessional(
    id: string,
    professional: Req.CreateProfessionalDto,
  ): Promise<ProfessionalEntity> {
    await this.professionalsRepository.update(id, { ...professional });

    const updatedProfessional = await this.getProfessionalById(id);

    return updatedProfessional;
  }

  public async deleteProfessional(id: string): Promise<void> {
    const result = await this.professionalsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Professional with ID "${id}" was not found`);
    }
  }
}
