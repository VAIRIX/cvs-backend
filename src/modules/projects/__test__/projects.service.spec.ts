import { Test, TestingModule } from '@nestjs/testing';
import {
  ProfessionalsProjectsRepository,
  ProjectsRepository,
} from 'src/repositories';
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
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
