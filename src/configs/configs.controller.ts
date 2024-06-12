import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { ConfigsService } from './configs.service';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';

@Controller('configs')
export class ConfigsController {
  constructor(private readonly configsService: ConfigsService) {}

  @Post()
  create(
    @Body('createConfigDto')
    createConfigDto: CreateConfigDto,
  ) {
    return this.configsService.create(createConfigDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const registry = await this.configsService.findOne(id);
    if (!registry) {
      throw new NotFoundException(`Config with ID ${id} not found`);
    }
    return registry;
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body('updateConfigDto')
    updateConfigDto: UpdateConfigDto,
  ) {
    return this.configsService.update(id, updateConfigDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number) {
    return this.configsService.remove(id);
  }
}
