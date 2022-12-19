import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { plainToInstance } from 'class-transformer';
import { Req } from 'src/dtos';
import { ProfessionalResDto } from 'src/dtos/res/professional-res.dto';
import { ProfessionalsRepository } from '../repositories/professionals.repository';

@Injectable()
export class ProfessionalsService {
  constructor(private professionalsRepository: ProfessionalsRepository) {}

  public async getProfessionals(
    professionalsFilterDto: Req.GetProfessionalsFilterDto,
  ): Promise<ProfessionalResDto[]> {
    const professionals = await this.professionalsRepository.getProfessionals(
      professionalsFilterDto,
    );

    return professionals.map((professional) =>
      plainToInstance(ProfessionalResDto, professional),
    );
  }

  public async getProfessionalById(id: string): Promise<ProfessionalResDto> {
    const professional = await this.professionalsRepository.findOneByOrFail({
      id,
    });

    return plainToInstance(ProfessionalResDto, professional);
  }

  public async createProfessional(
    professional: Req.CreateProfessionalDto,
  ): Promise<ProfessionalResDto> {
    return plainToInstance(
      ProfessionalResDto,
      this.professionalsRepository.createProfessional(professional),
    );
  }

  public async updateProfessional(
    id: string,
    professional: Req.CreateProfessionalDto,
  ): Promise<ProfessionalResDto> {
    await this.professionalsRepository.update(id, { ...professional });

    const updatedProfessional = await this.getProfessionalById(id);

    return plainToInstance(ProfessionalResDto, updatedProfessional);
  }

  public async deleteProfessional(id: string): Promise<void> {
    const result = await this.professionalsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Professional with ID "${id}" was not found`);
    }
  }
}
