import { Controller, Get, Inject } from '@nestjs/common';
import { IAppService } from './app.interface';

@Controller()
export class AppController {
  constructor(
    @Inject('IAppService') private readonly appService: IAppService,
  ) {}

  @Get()
  getHello(): Promise<string> {
    return this.appService.getHealthCheck();
  }
}
