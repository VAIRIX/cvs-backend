import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Req } from 'src/dtos';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body() signInReqDto: Req.SignInReqDto) {
    return this.authService.signIn(signInReqDto);
  }

  @Get('test')
  @UseGuards(JwtAuthGuard)
  testAuthenticated() {
    return 'authenticated';
  }
}
