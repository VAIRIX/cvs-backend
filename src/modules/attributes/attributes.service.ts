import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { plainToInstance } from 'class-transformer';
import { API_RESPONSE_MESSAGES } from 'src/constants';
import { Req, Res } from 'src/dtos';
import {
  AttributesRepository,
  AttributeTypesRepository,
} from 'src/repositories';

@Injectable()
export class AttributesService {
  constructor(
    private readonly attributesRepository: AttributesRepository,
    private readonly attributeTypesRepository: AttributeTypesRepository,
  ) {}

  public async getAttributes(
    attributesFilterDto: Req.GetAttributesFilterDto,
  ): Promise<Res.AttributeResDto[]> {
    const attributes = await this.attributesRepository.getAttributes(
      attributesFilterDto,
    );

    return attributes.map((attribute) =>
      plainToInstance(Res.AttributeResDto, attribute),
    );
  }

  public async getAttributeById(id: string): Promise<Res.AttributeResDto> {
    const attribute = await this.attributesRepository.findOneOrFail({
      where: { id },
      relations: {
        type: true,
      },
    });

    return plainToInstance(Res.AttributeResDto, attribute);
  }

  public async createAttribute(
    attribute: Req.CreateAttributeDto,
  ): Promise<Res.AttributeResDto> {
    const attributeType = await this.attributeTypesRepository.findOneOrFail({
      where: { id: attribute.typeId },
    });

    const createdAttribute = await this.attributesRepository.createAttribute({
      name: attribute.name,
      type: attributeType,
    });

    console.log({ createdAttribute });

    return plainToInstance(Res.AttributeResDto, createdAttribute);
  }

  public async updateAttribute(
    id: string,
    attribute: Req.CreateAttributeDto,
  ): Promise<Res.AttributeResDto> {
    await this.attributesRepository.update(id, { ...attribute });

    const updatedAttribute = await this.getAttributeById(id);

    return plainToInstance(Res.AttributeResDto, updatedAttribute);
  }

  public async deleteAttribute(id: string): Promise<void> {
    const result = await this.attributesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        API_RESPONSE_MESSAGES.ITEM_NOT_FOUND({ itemName: 'Attribute', id }),
      );
    }
  }

  public async getAttributeTypes(): Promise<Res.AttributeTypeResDto[]> {
    const attributeTypes = await this.attributeTypesRepository.find();

    return plainToInstance(Res.AttributeTypeResDto, attributeTypes);
  }

  public async validateAttributesById(attributeIds: string[]) {
    const foundAttributes = await this.attributesRepository
      .createQueryBuilder('attributes')
      .where('id IN (:...attributeIds)', { attributeIds })
      .getMany();

    return foundAttributes?.length === attributeIds?.length;
  }
}
