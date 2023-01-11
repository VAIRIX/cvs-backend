import { Test, TestingModule } from '@nestjs/testing';
import {
  ProfessionalsProjectsRepository,
  ProfessionalsRepository,
  ProjectsRepository,
} from 'src/repositories';
import { SeedService } from '../seed.service';

jest.mock('../../../repositories/projects.repository');
jest.mock('../../../repositories/professionals.repository');
jest.mock('../../../repositories/professionals-projects.repository');

describe('SeedService', () => {
  let service: SeedService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeedService,
        ProfessionalsRepository,
        ProjectsRepository,
        ProfessionalsProjectsRepository,
      ],
    }).compile();

    service = module.get<SeedService>(SeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
