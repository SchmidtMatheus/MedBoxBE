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
  Res,
} from '@nestjs/common';
import { RegistriesService } from './registries.service';
import { CreateRegistryDto } from './dto/create-registry.dto';
import { RegistryEntity } from './entities/registry.entity';
import * as XLSX from 'xlsx';
import { Response } from 'express';

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
  async downloadByIntervalDate(
    @Param('firstDate') firstDate: Date,
    @Param('lastDate') lastDate: Date,
    @Res() res: Response,
  ): Promise<void> {
    const registries = await this.registriesService.findByIntervalDate(
      firstDate,
      lastDate,
    );

    if (!registries || registries.length === 0) {
      res.status(404).send({ message: 'Nenhum registro encontrado' });
      return;
    }

    const formattedRegistries = registries.map((registry) => ({
      ID: registry.id,
      Temperatura: registry.temperature,
      Umidade: registry.humidity,
      'Data de Criação': new Date(registry.created_at).toLocaleString('pt-BR', {
        timeZone: 'UTC',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(formattedRegistries);
    XLSX.utils.book_append_sheet(wb, ws, 'Registros');

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=registries.xlsx',
    );
    res.send(excelBuffer);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.registriesService.remove(+id);
  }
}
