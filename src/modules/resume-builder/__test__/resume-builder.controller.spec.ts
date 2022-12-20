import { Test, TestingModule } from '@nestjs/testing';
import { ResumeBuilderController } from '../resume-builder.controller';
import { ResumeBuilderService } from '../resume-builder.service';
jest.mock('../resume-builder.service');

describe('ResumeBuilderController', () => {
  let controller: ResumeBuilderController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResumeBuilderController],
      providers: [ResumeBuilderService],
    }).compile();

    controller = module.get<ResumeBuilderController>(ResumeBuilderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
