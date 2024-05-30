import { Injectable } from '@nestjs/common';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigEntity } from './entities/config.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConfigsService {
  constructor(
    @InjectRepository(ConfigEntity)
    private readonly registryRepository: Repository<ConfigEntity>,
  ) {}
  async create(createConfigDto: CreateConfigDto) {
    return await this.registryRepository.save(createConfigDto);
  }

  async findOne(id: number) {
    return await this.registryRepository.findOneOrFail({ where: { id } });
  }

  async update(id: number, updateConfigDto: UpdateConfigDto) {
    const config = await this.findOne(id);
    this.registryRepository.merge(config, updateConfigDto);
    return await this.registryRepository.save(config);
  }

  async remove(id: number) {
    return this.registryRepository.delete(id);
  }
}
