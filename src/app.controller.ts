import { AppService } from './app.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from './auth/guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('operativo')
  getEstoyFuncionando(): string {
    return 'Me siento ok';
  }
  @Get('/estoyok/')
  getEstoyOk(): string {
    return 'Sigo ok con/';
  }
  @Get('usefactory')
  getUseFactory(): string {
    return this.appService.getUseFactory();
  }
  @Get('tasks')
  tasks() {
    return this.appService.getTasks();
  }
  // @SetMetadata('isPublic', true)
  @Get('nuevo')
  newEndpoint() {
    return 'yo soy nuevo';
  }
}
