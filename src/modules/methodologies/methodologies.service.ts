import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { plainToInstance } from 'class-transformer';
import { API_RESPONSE_MESSAGES } from 'src/constants';
import { Req, Res } from 'src/dtos';
import { MethodologiesRepository } from 'src/repositories';

@Injectable()
export class MethodologiesService {
  constructor(
    private readonly methodologiesRepository: MethodologiesRepository,
  ) {}

  public async getMethodologies(
    methodologiesFilterDto: Req.GetMethodologiesFilterDto,
  ): Promise<Res.MethodologyResDto[]> {
    const methodologies = await this.methodologiesRepository.getMethodologies(
      methodologiesFilterDto,
    );

    return methodologies.map((methodology) =>
      plainToInstance(Res.MethodologyResDto, methodology),
    );
  }

  public async getMethodologyById(id: string): Promise<Res.MethodologyResDto> {
    const methodology = await this.methodologiesRepository.findOneByOrFail({
      id,
    });

    return plainToInstance(Res.MethodologyResDto, methodology);
  }

  public async createMethodology(
    methodology: Req.CreateMethodologyDto,
  ): Promise<Res.MethodologyResDto> {
    const createdMethodology =
      await this.methodologiesRepository.createMethodology(methodology);

    return plainToInstance(Res.MethodologyResDto, createdMethodology);
  }

  public async updateMethodology(
    id: string,
    methodology: Req.CreateMethodologyDto,
  ): Promise<Res.MethodologyResDto> {
    await this.methodologiesRepository.update(id, { ...methodology });

    const updatedMethodology = await this.getMethodologyById(id);

    return plainToInstance(Res.MethodologyResDto, updatedMethodology);
  }

  public async deleteMethodology(id: string): Promise<void> {
    const result = await this.methodologiesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        API_RESPONSE_MESSAGES.ITEM_NOT_FOUND({ itemName: 'Methodology', id }),
      );
    }
  }
}
