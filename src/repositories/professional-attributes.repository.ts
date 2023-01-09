import { Injectable } from '@nestjs/common';
import { Req } from 'src/dtos';
import { ProfessionalAttributesEntity } from 'src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProfessionalAttributesRepository extends Repository<ProfessionalAttributesEntity> {
  constructor(private dataSource: DataSource) {
    super(ProfessionalAttributesEntity, dataSource.createEntityManager());
  }

  public createProfessionalAttributeEntities(
    professionalId: string,
    attributes: Req.AddAttributeToProfessionalReqDto[],
  ): ProfessionalAttributesEntity[] {
    const professionalAttributesEntities = attributes?.map((attribute) =>
      this.create({
        attributeId: attribute.attributeId,
        professionalId,
        level: attribute.level,
      }),
    );

    return professionalAttributesEntities;
  }

  public async updateProfessionalAttributes(
    professionalId: string,
    attributes: Req.AddAttributeToProfessionalReqDto[],
  ) {
    return await this.dataSource.transaction(async (entityManager) => {
      await entityManager.delete(this.metadata.tableName, {
        professionalId,
      });

      const professionalAttributes = this.createProfessionalAttributeEntities(
        professionalId,
        attributes,
      );

      return await entityManager.save(professionalAttributes);
    });
  }
}
