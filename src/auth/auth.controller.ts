import { Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('register')
  registerUser() {}

  @Post()
  loginUser() {}

  @Get('verify')
  registerUser() {}

}
