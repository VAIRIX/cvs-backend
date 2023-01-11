import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalsService } from 'src/modules/professionals/professionals.service';
import { ProjectsService } from 'src/modules/projects/projects.service';
import {
  AttributesRepository,
  AttributeTypesRepository,
} from 'src/repositories';
import { SeedService } from '../seed.service';

jest.mock('../../../repositories/attributes.repository');
jest.mock('../../../repositories/attribute-types.repository');
jest.mock('../../../modules/projects/projects.service');
jest.mock('../../../modules/professionals/professionals.service');

describe('SeedService', () => {
  let service: SeedService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeedService,
        ProjectsService,
        ProfessionalsService,
        AttributeTypesRepository,
        AttributesRepository,
      ],
    }).compile();

    service = module.get<SeedService>(SeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
