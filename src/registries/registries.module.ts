import { Module } from '@nestjs/common';
import { RegistriesService } from './registries.service';
import { RegistriesController } from './registries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistryEntity } from './entities/registry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RegistryEntity])],
  controllers: [RegistriesController],
  providers: [RegistriesService],
})
export class RegistriesModule {}
