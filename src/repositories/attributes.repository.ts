import { Injectable } from '@nestjs/common';
import { Req } from 'src/dtos';
import { AttributeEntity } from 'src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AttributesRepository extends Repository<AttributeEntity> {
  constructor(private dataSource: DataSource) {
    super(AttributeEntity, dataSource.createEntityManager());
  }

  public async getAttributes(
    filterDto: Req.GetAttributesFilterDto,
  ): Promise<AttributeEntity[]> {
    const { search } = filterDto;

    const query = this.createQueryBuilder('attribute').innerJoinAndSelect(
      'attribute.type',
      'attribute_types',
    );

    if (search)
      query.andWhere('LOWER(attribute.name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });

    const attributes = await query.getMany();

    return attributes;
  }

  public async createAttribute(
    attribute: Partial<AttributeEntity>,
  ): Promise<AttributeEntity> {
    const attributeObject = this.create(attribute);

    await this.save(attributeObject);

    return attributeObject;
  }
}
