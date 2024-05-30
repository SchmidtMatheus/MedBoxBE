import { Test, TestingModule } from '@nestjs/testing';
import { RegistriesController } from './registries.controller';
import { RegistriesService } from './registries.service';

describe('RegistriesController', () => {
  let controller: RegistriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistriesController],
      providers: [RegistriesService],
    }).compile();

    controller = module.get<RegistriesController>(RegistriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
