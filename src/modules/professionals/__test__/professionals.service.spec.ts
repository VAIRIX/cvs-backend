import { Test, TestingModule } from '@nestjs/testing';
import {
  ProfessionalsProjectsRepository,
  ProfessionalsRepository,
} from 'src/repositories';
import { DataSource } from 'typeorm';
import { ProfessionalsService } from '../professionals.service';

jest.mock('../../../repositories/professionals.repository');
jest.mock('../../../repositories/professionals-projects.repository');

describe('ProfessionalsService', () => {
  let service: ProfessionalsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfessionalsService,
        ProfessionalsRepository,
        ProfessionalsProjectsRepository,
        {
          provide: DataSource,
          useValue: {
            transaction: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProfessionalsService>(ProfessionalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
