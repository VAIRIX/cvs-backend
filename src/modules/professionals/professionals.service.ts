import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { plainToInstance } from 'class-transformer';
import { Req, Res } from 'src/dtos';
import { ProfessionalsRepository } from 'src/repositories';

@Injectable()
export class ProfessionalsService {
  constructor(
    private readonly professionalsRepository: ProfessionalsRepository,
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
    const professional = await this.professionalsRepository.findOneByOrFail({
      id,
    });

    return plainToInstance(Res.ProfessionalResDto, professional);
  }

  public async createProfessional(
    professional: Req.CreateProfessionalDto,
  ): Promise<Res.ProfessionalResDto> {
    const createdProfessional =
      await this.professionalsRepository.createProfessional(professional);

    return plainToInstance(Res.ProfessionalResDto, createdProfessional);
  }

  public async updateProfessional(
    id: string,
    professional: Req.CreateProfessionalDto,
  ): Promise<Res.ProfessionalResDto> {
    await this.professionalsRepository.update(id, { ...professional });

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
