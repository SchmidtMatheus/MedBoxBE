import { Test, TestingModule } from '@nestjs/testing';
import { RegistriesService } from './registries.service';

describe('RegistriesService', () => {
  let service: RegistriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistriesService],
    }).compile();

    service = module.get<RegistriesService>(RegistriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
