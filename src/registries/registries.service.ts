import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegistryDto } from './dto/create-registry.dto';
import { RegistryEntity } from './entities/registry.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

@Injectable()
export class RegistriesService {
  constructor(
    @InjectRepository(RegistryEntity)
    private readonly registryRepository: Repository<RegistryEntity>,
  ) {}
  async create(createRegistryDto: CreateRegistryDto) {
    return await this.registryRepository.save(createRegistryDto);
  }

  async findAll() {
    return await this.registryRepository.find();
  }

  async findOne(id: number) {
    try {
      return await this.registryRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findByIntervalDate(
    firstDate: Date,
    lastDate: Date,
  ): Promise<RegistryEntity[]> {
    return this.registryRepository.find({
      where: {
        created_at: Between(firstDate, lastDate),
      },
    });
  }

  async remove(id: number) {
    return await this.registryRepository.delete(id);
  }
}
