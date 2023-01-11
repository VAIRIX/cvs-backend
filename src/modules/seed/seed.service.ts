import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { DEFAULT_ATTRIBUTES_TYPES } from 'src/constants';
import { Req, Res } from 'src/dtos';
import { AttributeEntity } from 'src/entities';
import {
  AttributeTypesRepository,
  AttributesRepository,
} from 'src/repositories';
import { ProfessionalsService } from '../professionals/professionals.service';
import { ProjectsService } from '../projects/projects.service';
import {
  attributeTypesSeed,
  methodologiesSeed,
  professionalSeed,
  projectsSeed,
  responsibilitySeed,
  skillsSeed,
  technologiesSeed,
} from './__resources__/data.seed';

type AttributeId = { id: string };

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private attributeTypesRepository: AttributeTypesRepository,
    private attributeRepository: AttributesRepository,
    private professionalsService: ProfessionalsService,
    private projectService: ProjectsService,
  ) {}

  async onApplicationBootstrap() {
    try {
      const attributesCreated = await this.attributeTypesRepository.find();

      if (attributesCreated?.length) return;

      const attributes = await this.createDefaultAttributes();

      const projects = await this.createDefaultProjects();

      await this.createDefaultProfessional(projects, attributes);
    } catch (error) {
      this.logger.error(error);
      process.exit(1);
    }
  }

  private async createDefaultAttributes(): Promise<AttributeId[]> {
    await this.attributeTypesRepository.insert(attributeTypesSeed);

    let attributes: AttributeId[] = [];

    attributes = attributes.concat(
      await this.createAttributeByType(
        technologiesSeed,
        DEFAULT_ATTRIBUTES_TYPES.TECHNOLOGIES,
      ),
    );

    attributes = attributes.concat(
      await this.createAttributeByType(
        methodologiesSeed,
        DEFAULT_ATTRIBUTES_TYPES.METHODOLOGIES,
      ),
    );

    attributes = attributes.concat(
      await this.createAttributeByType(
        skillsSeed,
        DEFAULT_ATTRIBUTES_TYPES.SKILLS,
      ),
    );

    return attributes;
  }

  private async createAttributeByType(
    attributes: Partial<AttributeEntity>[],
    attributeTypeName: string,
  ): Promise<AttributeId[]> {
    const attributeType = await this.attributeTypesRepository.findOneOrFail({
      where: { name: attributeTypeName },
    });
    attributes.forEach((attr) => {
      attr.type = attributeType;
    });
    const insertResult = await this.attributeRepository.insert(attributes);
    const result = insertResult.identifiers as AttributeId[];
    return result;
  }

  private async createDefaultProjects(): Promise<Res.ProjectResDto[]> {
    const projects: Res.ProjectResDto[] = [];

    const technologies = await this.getAttributesByType(
      DEFAULT_ATTRIBUTES_TYPES.TECHNOLOGIES,
    );

    for (const project of projectsSeed) {
      const projectDto: Req.CreateProjectDto = {
        name: project.name,
        description: project.description,
        from: project.from,
        to: project.to,
        duration: project.duration,
        professionals: [],
        attributes: technologies.map((tech) => ({
          attributeId: tech.id,
          from: project.from,
          to: project.to,
        })),
      };
      projects.push(await this.projectService.createProject(projectDto));
    }

    return projects;
  }

  private async createDefaultProfessional(
    projects: Res.ProjectResDto[],
    attributes: AttributeId[],
  ): Promise<void> {
    const newProfessionalDto: Req.CreateProfessionalDto = {
      about: professionalSeed.about,
      email: professionalSeed.email,
      firstName: professionalSeed.firstName,
      lastName: professionalSeed.lastName,
      english: professionalSeed.english,
      headline: professionalSeed.headline,
      attributes: attributes.map((attr) => ({
        attributeId: attr.id,
        level: Math.floor(Math.random() * 5) + 1,
      })),
      projects: projects.map((project) => ({
        responsibility:
          responsibilitySeed[
            Math.floor(Math.random() * responsibilitySeed.length)
          ],
        projectId: project.id,
      })),
    };

    await this.professionalsService.createProfessional(newProfessionalDto);
  }

  private async getAttributesByType(type: string) {
    const attributes = await this.attributeRepository
      .createQueryBuilder('attribute')
      .innerJoinAndSelect('attribute.type', 'attribute_types')
      .where('attribute_types.name = :type', { type })
      .getMany();

    return attributes;
  }
}
