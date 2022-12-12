import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalsController } from '../professionals.controller';
import { ProfessionalsService } from '../professionals.service';
jest.mock('../professionals.service');

describe('ProfessionalsController', () => {
  let controller: ProfessionalsController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfessionalsService],
      controllers: [ProfessionalsController],
    }).compile();

    controller = module.get<ProfessionalsController>(ProfessionalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
