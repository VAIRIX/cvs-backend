import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'src/utils/hash';
import { plainToInstance } from 'class-transformer';
import { AdminsRepository } from 'src/repositories';
import { API_RESPONSE_MESSAGES } from 'src/constants/api-response-messages';
import { Req, Res } from 'src/dtos';

@Injectable()
export class AuthService {
  constructor(
    private adminRepository: AdminsRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInReqDto: Req.SignInReqDto): Promise<any> {
    const user = await this.adminRepository.findOneBy({
      username: signInReqDto.username,
    });
    const validPassword = await compare(signInReqDto.password, user?.password);
    if (user && validPassword) {
      const payload = { username: user.username, sub: user.id };
      return plainToInstance(Res.SignInResDto, {
        accessToken: this.jwtService.sign({ payload }),
      });
    }
    throw new UnauthorizedException(API_RESPONSE_MESSAGES.INVALID_CREDENTIALS);
  }
}
