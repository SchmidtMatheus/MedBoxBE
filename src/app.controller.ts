import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('fuzzy/:temperatura')
  getFuzzifiedValue(
    @Param('temperatura') temperatura: number,
  ): Promise<number> {
    return this.appService.defuzzify(temperatura);
  }
}
