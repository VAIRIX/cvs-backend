import { Test, TestingModule } from '@nestjs/testing';
import { MethodologiesController } from '../methodologies.controller';
import { MethodologiesService } from '../methodologies.service';
jest.mock('../methodologies.service');

describe('MethodologiesController', () => {
  let controller: MethodologiesController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MethodologiesService],
      controllers: [MethodologiesController],
    }).compile();

    controller = module.get<MethodologiesController>(MethodologiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
