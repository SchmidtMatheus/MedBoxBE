import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Body,
} from '@nestjs/common';
import { RegistriesService } from './registries.service';
import { CreateRegistryDto } from './dto/create-registry.dto';
import { RegistryEntity } from './entities/registry.entity';

@Controller('registries')
export class RegistriesController {
  constructor(private readonly registriesService: RegistriesService) {}

  @Post()
  create(@Body('createRegistryDto') createRegistryDto: CreateRegistryDto) {
    return this.registriesService.create(createRegistryDto);
  }

  @Get()
  findAll(): Promise<RegistryEntity[]> {
    return this.registriesService.findAll();
  }

  @Get(':id')
  findOne(id: number): Promise<RegistryEntity | null> {
    const registry = this.registriesService.findOne(id);
    if (!registry) {
      throw new NotFoundException(`Registry with ID ${id} not found`);
    }
    return registry;
  }

  @Get(':firstDate/:lastDate')
  findByIntervalDate(
    firstDate: Date,
    lastDate: Date,
  ): Promise<RegistryEntity[]> {
    const registries = this.registriesService.findByIntervalDate(
      firstDate,
      lastDate,
    );
    if (!registries) {
      throw new NotFoundException(`Registries not found on this interval`);
    }
    return registries;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.registriesService.remove(+id);
  }
}
