import { Test, TestingModule } from '@nestjs/testing';
import { AttributesService } from 'src/modules/attributes/attributes.service';
import {
  AttributesRepository,
  AttributeTypesRepository,
  ProfessionalsProjectsRepository,
  ProjectsRepository,
} from 'src/repositories';
import { ProjectAttributesRepository } from 'src/repositories/project-attributes.repository';
import { DataSource } from 'typeorm';
import { ProjectsService } from '../projects.service';

jest.mock('../../../repositories/projects.repository');

describe('ProjectsService', () => {
  let service: ProjectsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        ProjectsRepository,
        ProfessionalsProjectsRepository,
        {
          provide: DataSource,
          useValue: {
            transaction: jest.fn(),
            createEntityManager: jest.fn(),
          },
        },
        ProjectAttributesRepository,
        AttributesService,
        AttributesRepository,
        AttributeTypesRepository,
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
