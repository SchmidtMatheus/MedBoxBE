import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistriesModule } from './registries/registries.module';
import { ConfigsModule } from './configs/configs.module';
import { RegistryEntity } from './registries/entities/registry.entity';
import { ConfigEntity } from './configs/entities/config.entity';
import { ConfigsService } from './configs/configs.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'postgres',
      synchronize: true,
      entities: [RegistryEntity, ConfigEntity],
    }),
    RegistriesModule,
    ConfigsModule,
    TypeOrmModule.forFeature([RegistryEntity, ConfigEntity]),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigsService],
})
export class AppModule {}
