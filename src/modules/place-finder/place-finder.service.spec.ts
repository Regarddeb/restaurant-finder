import { Test, TestingModule } from '@nestjs/testing';
import { PlaceFinderService } from './place-finder.service';

describe('PlaceFinderService', () => {
  let service: PlaceFinderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaceFinderService],
    }).compile();

    service = module.get<PlaceFinderService>(PlaceFinderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
