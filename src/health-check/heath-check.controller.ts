import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class HeathCheckController {
  @Get()
  healthCheck() {
    return 'Client Gateway is up and running!!!';
  }
}
