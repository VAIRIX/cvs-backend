import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalsRepository } from 'src/repositories/professionals.repository';
import { ProfessionalsService } from '../professionals.service';

jest.mock('../../repositories/professionals.repository');

describe('ProfessionalsService', () => {
  let service: ProfessionalsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfessionalsService, ProfessionalsRepository],
    }).compile();

    service = module.get<ProfessionalsService>(ProfessionalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
