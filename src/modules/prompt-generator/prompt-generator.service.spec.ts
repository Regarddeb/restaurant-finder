import { Test, TestingModule } from '@nestjs/testing';
import { PromptGeneratorService } from './prompt-generator.service';

describe('PromptGeneratorService', () => {
  let service: PromptGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromptGeneratorService],
    }).compile();

    service = module.get<PromptGeneratorService>(PromptGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
