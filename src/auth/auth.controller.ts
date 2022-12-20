import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Req, Res } from 'src/dtos';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
@Public()
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Res.SignInResDto })
  signIn(@Body() signInReqDto: Req.SignInReqDto): Promise<Res.SignInResDto> {
    return this.authService.signIn(signInReqDto);
  }
}
