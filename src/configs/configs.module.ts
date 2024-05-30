import { Module } from '@nestjs/common';
import { ConfigsService } from './configs.service';
import { ConfigsController } from './configs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigEntity } from './entities/config.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConfigEntity])],
  controllers: [ConfigsController],
  providers: [ConfigsService],
})
export class ConfigsModule {}
